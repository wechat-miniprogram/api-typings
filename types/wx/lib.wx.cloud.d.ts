/*! *****************************************************************************
Copyright (c) 2025 Tencent, Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
***************************************************************************** */

/// <reference lib="es2018.asynciterable" />

/**
 * Common interfaces and types
 */

interface IAPIError {
    errMsg: string
}

interface IAPIParam<T = any> {
    config?: ICloudConfig
    success?: (res: T) => void
    fail?: (err: IAPIError) => void
    complete?: (val: T | IAPIError) => void
}

interface IAPISuccessParam {
    errMsg: string
}

type IAPICompleteParam = IAPISuccessParam | IAPIError

type IAPIFunction<T, P extends IAPIParam<T>> = (param?: P) => Promise<T>

interface IInitCloudConfig {
    env?:
        | string
        | {
              database?: string
              functions?: string
              storage?: string
          }
    traceUser?: boolean
}

interface ICloudConfig {
    env?: string
    traceUser?: boolean
}

interface IICloudAPI {
    init: (config?: IInitCloudConfig) => void
    [api: string]: AnyFunction | IAPIFunction<any, any>
}

interface ICloudService {
    name: string

    getAPIs: () => { [name: string]: IAPIFunction<any, any> }
}

interface ICloudServices {
    [serviceName: string]: ICloudService
}

interface ICloudMetaData {
    session_id: string
}

declare class InternalSymbol {}

interface AnyObject {
    [x: string]: any
}

type AnyArray = any[]

type AnyFunction = (...args: any[]) => any

/**
 * extend wx with cloud
 */
interface WxCloud {
    init: (config?: ICloudConfig) => void

    callFunction(param: OQ<ICloud.CallFunctionParam>): void
    callFunction(
        param: RQ<ICloud.CallFunctionParam>
    ): Promise<ICloud.CallFunctionResult>

    uploadFile(param: OQ<ICloud.UploadFileParam>): WechatMiniprogram.UploadTask
    uploadFile(
        param: RQ<ICloud.UploadFileParam>
    ): Promise<ICloud.UploadFileResult>

    downloadFile(
        param: OQ<ICloud.DownloadFileParam>
    ): WechatMiniprogram.DownloadTask
    downloadFile(
        param: RQ<ICloud.DownloadFileParam>
    ): Promise<ICloud.DownloadFileResult>

    getTempFileURL(param: OQ<ICloud.GetTempFileURLParam>): void
    getTempFileURL(
        param: RQ<ICloud.GetTempFileURLParam>
    ): Promise<ICloud.GetTempFileURLResult>

    deleteFile(param: OQ<ICloud.DeleteFileParam>): void
    deleteFile(
        param: RQ<ICloud.DeleteFileParam>
    ): Promise<ICloud.DeleteFileResult>

    database: (config?: ICloudConfig) => DB.Database

    CloudID: ICloud.ICloudIDConstructor
    CDN: ICloud.ICDNConstructor

    callContainer(param: OQ<ICloud.CallContainerParam>): void
    callContainer(
        param: RQ<ICloud.CallContainerParam>
    ): Promise<ICloud.CallContainerResult>

    connectContainer(param: OQ<ICloud.ConnectContainerParam>): void
    connectContainer(
        param: RQ<ICloud.ConnectContainerParam>
    ): Promise<ICloud.ConnectContainerResult>

    services: ICloud.CloudServices
    extend: ICloud.ICloudExtendServices
}

declare namespace ICloud {
    interface ICloudAPIParam<T = any> extends IAPIParam<T> {
        config?: ICloudConfig
    }

    // === API: callFunction ===
    type CallFunctionData = AnyObject

    interface CallFunctionResult extends IAPISuccessParam {
        result: AnyObject | string | undefined
    }

    interface CallFunctionParam extends ICloudAPIParam<CallFunctionResult> {
        name: string
        data?: CallFunctionData
        slow?: boolean
    }
    // === end ===

    // === API: container ===
    type CallContainerData = AnyObject

    interface CallContainerResult extends IAPISuccessParam {
        data: any
        statusCode: number
        header: Record<string, any>
        callID: string
    }

    interface CallContainerParam extends ICloudAPIParam<CallContainerResult> {
        path: string
        service?: string
        method?: string
        header?: Record<string, any>
        data?: any // string, object, ArrayBuffer
        dataType?: string
        responseType?: string
        timeout?: number
        verbose?: boolean
        followRedirect?: boolean
    }

    interface ConnectContainerResult extends IAPISuccessParam {
        socketTask: WechatMiniprogram.SocketTask
    }

    interface ConnectSocketOptions extends IAPIParam<void> {
        header?: Record<string, string>
        protocols?: string[]
        tcpNoDelay?: boolean
        perMessageDeflate?: boolean
        timeout?: number
    }

    type ConnectContainerParam = Omit<
        ConnectSocketOptions,
        'success' | 'fail' | 'complete'
    > &
        ICloudAPIParam<ConnectContainerResult> & {
            service: string
            path?: string
        }
    // === end ===

    // === API: services ===
    type AsyncSession<T> = T | PromiseLike<T>
    interface GatewayCallOptions {
        path: string
        data: any
        shouldSerialize?: boolean
        apiVersion?: number
    }
    interface GatewayInstance {
        call: (
            param: CallContainerParam & GatewayCallOptions
        ) => Promise<CallContainerResult>
        refresh: (session: AsyncSession<string>) => Promise<void>
    }
    interface GatewayConstructOptions {
        id?: string
        appid?: string
        domain?: string
        keepalive?: boolean
        prefetch?: boolean
        prefetchOptions?: {
            concurrent?: number
            enableQuic?: boolean
            enableHttp2?: boolean
        }
    }
    interface CloudServices {
        Gateway: (opts: GatewayConstructOptions) => GatewayInstance
    }
    // === end ===

    // === API: extend ===
    interface ICloudExtendServices {
        AI: ICloudAI
    }
    interface ICloudAI {
        createModel: (modelName: string) => ICloudAIModel
        bot: ICloudBot
    }
    interface ICloudAICallbackOptions {
        onEvent?: (ev: ICloudAIEvent) => void
        onText?: (text: string) => void
        onFinish?: (text: string) => void
    }
    interface ICloudBot {
        get: ({ botId: string }: any) => any
        list: (data: any) => any
        create: (data: any) => any
        update: (data: any) => any
        delete: (data: any) => any
        getChatRecords: (data: any) => any
        sendFeedback: (data: any) => any
        getFeedBack: (data: any) => any
        getRecommendQuestions: (options: ICloudAICallbackOptions & ICloudBotOptions) => Promise<ICloudAIStreamResult>
        sendMessage: (options: ICloudAICallbackOptions & ICloudBotOptions) => Promise<ICloudAIStreamResult>
    }

    interface ICloudBotOptions { data: any, botId: string, timeout?: number }
    interface ICloudAIModel {
        streamText: (opts: ICloudAIOptions & ICloudAICallbackOptions) => Promise<ICloudAIStreamResult>
        generateText: (opts: ICloudAIOptions & ICloudAICallbackOptions) => Promise<string>
    }
    interface ICloudAIChatMessage {
        role: 'user' | 'assistant' | string
        content: string
    }
    interface ICloudAIChatModelInput {
        model: string
        messages: ICloudAIChatMessage[]
        temperature?: number
        top_p?: number
    }
    interface ICloudAIOptions{
        data: ICloudAIChatModelInput
    }
    interface ICloudAIEvent {
        event: string
        id: string
        data: string
        json?: any
    }

    interface AsyncIterator<T> {
        next(value?: any): Promise<IteratorResult<T>>
        return?(value?: any): Promise<IteratorResult<T>>
        throw?(e?: any): Promise<IteratorResult<T>>
        [Symbol.asyncIterator](): AsyncIterableIterator<T>
    }
    interface ICloudAIStreamResult {
        textStream: AsyncIterator<string>
        eventStream: AsyncIterator<ICloudAIEvent>
        abort?: () => void
    }
    // === end ===

    // === API: uploadFile ===
    interface UploadFileResult extends IAPISuccessParam {
        fileID: string
        statusCode: number
    }

    interface UploadFileParam extends ICloudAPIParam<UploadFileResult> {
        cloudPath: string
        filePath: string
        header?: AnyObject
    }
    // === end ===

    // === API: downloadFile ===
    interface DownloadFileResult extends IAPISuccessParam {
        tempFilePath: string
        statusCode: number
    }

    interface DownloadFileParam extends ICloudAPIParam<DownloadFileResult> {
        fileID: string
        cloudPath?: string
    }
    // === end ===

    // === API: getTempFileURL ===
    interface GetTempFileURLResult extends IAPISuccessParam {
        fileList: GetTempFileURLResultItem[]
    }

    interface GetTempFileURLResultItem {
        fileID: string
        tempFileURL: string
        maxAge: number
        status: number
        errMsg: string
    }

    interface GetTempFileURLParam extends ICloudAPIParam<GetTempFileURLResult> {
        fileList: string[]
    }
    // === end ===

    // === API: deleteFile ===
    interface DeleteFileResult extends IAPISuccessParam {
        fileList: DeleteFileResultItem[]
    }

    interface DeleteFileResultItem {
        fileID: string
        status: number
        errMsg: string
    }

    interface DeleteFileParam extends ICloudAPIParam<DeleteFileResult> {
        fileList: string[]
    }
    // === end ===

    // === API: CloudID ===
    abstract class CloudID {
        constructor(cloudID: string)
    }

    interface ICloudIDConstructor {
        new (cloudId: string): CloudID
        (cloudId: string): CloudID
    }
    // === end ===

    // === API: CDN ===
    abstract class CDN {
        target: string | ArrayBuffer | ICDNFilePathSpec
        constructor(target: string | ArrayBuffer | ICDNFilePathSpec)
    }

    interface ICDNFilePathSpec {
        type: 'filePath'
        filePath: string
    }

    interface ICDNConstructor {
        new (options: string | ArrayBuffer | ICDNFilePathSpec): CDN
        (options: string | ArrayBuffer | ICDNFilePathSpec): CDN
    }
    // === end ===
}

// === Database ===
declare namespace DB {
    /**
     * The class of all exposed cloud database instances
     */
    class Database {
        readonly config: ICloudConfig
        readonly command: DatabaseCommand
        readonly Geo: IGeo
        readonly serverDate: () => ServerDate
        readonly RegExp: IRegExpConstructor

        private constructor()

        collection(collectionName: string): CollectionReference
    }

    interface Aggregate {
        /**
         * @description 聚合阶段。添加新字段到输出的记录。经过 addFields 聚合阶段，输出的所有记录中除了输入时带有的字段外，还将带有 addFields 指定的字段。
         */
        addFields(object: any): Aggregate
        /**
         * @description  聚合阶段。将输入记录根据给定的条件和边界划分成不同的组，每组即一个 bucket。
         */
        bucket(object: any): Aggregate
        /**
         * @description 聚合阶段。将输入记录根据给定的条件划分成不同的组，每组即一个 bucket。与 bucket 的其中一个不同之处在于无需指定 boundaries，bucketAuto 会自动尝试将记录尽可能平均地分散到每组中。
         */
        bucketAuto(object: any): Aggregate
        /**
         * @description 聚合阶段。计算上一聚合阶段输入到本阶段的记录数，输出一个记录，其中指定字段的值为记录数。
         */
        count(fieldName: string): Aggregate
        /**
         * @description  标志聚合操作定义完成，发起实际聚合操作。
         */
        end(): Promise<any>
        /**
         * @description  聚合阶段。将记录按照离给定点从近到远输出。
         */
        geoNear(object: any): Aggregate
        /**
         * @description  聚合阶段。将输入记录按给定表达式分组，输出时每个记录代表一个分组，每个记录的 _id 是区分不同组的 key。输出记录中也可以包括累计值，将输出字段设为累计值即会从该分组中计算累计值。
         */
        group(object: any): Aggregate
        /**
         * @description 聚合阶段。限制输出到下一阶段的记录数。
         */
        limit(value: number): Aggregate
        /**
         * @description 聚合阶段。聚合阶段。联表查询。与同个数据库下的一个指定的集合做 left outer join(左外连接)。对该阶段的每一个输入记录，lookup 会在该记录中增加一个数组字段，该数组是被联表中满足匹配条件的记录列表。lookup 会将连接后的结果输出给下个阶段。
         */
        lookup(object: any): Aggregate
        /**
         * @description 聚合阶段。根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。
         */
        match(object: any): Aggregate
        /**
         * @description 聚合阶段。把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。
         */
        project(object: any): Aggregate
        /**
         * @description 聚合阶段。指定一个已有字段作为输出的根节点，也可以指定一个计算出的新字段作为根节点。
         */
        replaceRoot(object: any): Aggregate
        /**
         * @description 聚合阶段。随机从文档中选取指定数量的记录。
         */
        sample(size: number): Aggregate
        /**
         * @description 聚合阶段。指定一个正整数，跳过对应数量的文档，输出剩下的文档。
         */
        skip(value: number): Aggregate
        /**
         * @description 聚合阶段。根据指定的字段，对输入的文档进行排序。
         */
        sort(object: any): Aggregate
        /**
         * @description   聚合阶段。根据传入的表达式，将传入的集合进行分组（group）。然后计算不同组的数量，并且将这些组按照它们的数量进行排序，返回排序后的结果。
         */
        sortByCount(object: any): Aggregate
        /**
         * @description   聚合阶段。使用指定的数组字段中的每个元素，对文档进行拆分。拆分后，文档会从一个变为一个或多个，分别对应数组的每个元素。
         */
        unwind(value: string | object): Aggregate
    }

    class CollectionReference extends Query {
        readonly collectionName: string

        private constructor(name: string, database: Database)

        doc(docId: string | number): DocumentReference

        add(options: OQ<IAddDocumentOptions>): void
        add(options: RQ<IAddDocumentOptions>): Promise<IAddResult>
        aggregate(): Aggregate
    }

    class DocumentReference {
        private constructor(docId: string | number, database: Database)

        field(object: Record<string, any>): this

        get(options: OQ<IGetDocumentOptions>): void
        get(options?: RQ<IGetDocumentOptions>): Promise<IQuerySingleResult>

        set(options: OQ<ISetSingleDocumentOptions>): void
        set(options?: RQ<ISetSingleDocumentOptions>): Promise<ISetResult>

        update(options: OQ<IUpdateSingleDocumentOptions>): void
        update(
            options?: RQ<IUpdateSingleDocumentOptions>
        ): Promise<IUpdateResult>

        remove(options: OQ<IRemoveSingleDocumentOptions>): void
        remove(
            options?: RQ<IRemoveSingleDocumentOptions>
        ): Promise<IRemoveResult>

        watch(options: IWatchOptions): RealtimeListener
    }

    class RealtimeListener {
        // "And Now His Watch Is Ended"
        close: () => Promise<void>
    }

    class Query {
        where(condition: IQueryCondition): Query

        orderBy(fieldPath: string, order: string): Query

        limit(max: number): Query

        skip(offset: number): Query

        field(object: Record<string, any>): Query

        get(options: OQ<IGetDocumentOptions>): void
        get(options?: RQ<IGetDocumentOptions>): Promise<IQueryResult>

        count(options: OQ<ICountDocumentOptions>): void
        count(options?: RQ<ICountDocumentOptions>): Promise<ICountResult>

        watch(options: IWatchOptions): RealtimeListener
    }

    interface DatabaseCommand {
        eq(val: any): DatabaseQueryCommand
        neq(val: any): DatabaseQueryCommand
        gt(val: any): DatabaseQueryCommand
        gte(val: any): DatabaseQueryCommand
        lt(val: any): DatabaseQueryCommand
        lte(val: any): DatabaseQueryCommand
        in(val: any[]): DatabaseQueryCommand
        nin(val: any[]): DatabaseQueryCommand

        geoNear(options: IGeoNearCommandOptions): DatabaseQueryCommand
        geoWithin(options: IGeoWithinCommandOptions): DatabaseQueryCommand
        geoIntersects(
            options: IGeoIntersectsCommandOptions
        ): DatabaseQueryCommand

        and(
            ...expressions: Array<DatabaseLogicCommand | IQueryCondition>
        ): DatabaseLogicCommand
        or(
            ...expressions: Array<DatabaseLogicCommand | IQueryCondition>
        ): DatabaseLogicCommand
        nor(
            ...expressions: Array<DatabaseLogicCommand | IQueryCondition>
        ): DatabaseLogicCommand
        not(expression: DatabaseLogicCommand): DatabaseLogicCommand

        exists(val: boolean): DatabaseQueryCommand

        mod(divisor: number, remainder: number): DatabaseQueryCommand

        all(val: any[]): DatabaseQueryCommand
        elemMatch(val: any): DatabaseQueryCommand
        size(val: number): DatabaseQueryCommand

        set(val: any): DatabaseUpdateCommand
        remove(): DatabaseUpdateCommand
        inc(val: number): DatabaseUpdateCommand
        mul(val: number): DatabaseUpdateCommand
        min(val: number): DatabaseUpdateCommand
        max(val: number): DatabaseUpdateCommand
        rename(val: string): DatabaseUpdateCommand
        bit(val: number): DatabaseUpdateCommand

        push(...values: any[]): DatabaseUpdateCommand
        pop(): DatabaseUpdateCommand
        shift(): DatabaseUpdateCommand
        unshift(...values: any[]): DatabaseUpdateCommand
        addToSet(val: any): DatabaseUpdateCommand
        pull(val: any): DatabaseUpdateCommand
        pullAll(val: any): DatabaseUpdateCommand

        project: {
            slice(val: number | [number, number]): DatabaseProjectionCommand
        }

        aggregate: {
            __safe_props__?: Set<string>

            abs(val: any): DatabaseAggregateCommand
            add(val: any): DatabaseAggregateCommand
            addToSet(val: any): DatabaseAggregateCommand
            allElementsTrue(val: any): DatabaseAggregateCommand
            and(val: any): DatabaseAggregateCommand
            anyElementTrue(val: any): DatabaseAggregateCommand
            arrayElemAt(val: any): DatabaseAggregateCommand
            arrayToObject(val: any): DatabaseAggregateCommand
            avg(val: any): DatabaseAggregateCommand
            ceil(val: any): DatabaseAggregateCommand
            cmp(val: any): DatabaseAggregateCommand
            concat(val: any): DatabaseAggregateCommand
            concatArrays(val: any): DatabaseAggregateCommand
            cond(val: any): DatabaseAggregateCommand
            convert(val: any): DatabaseAggregateCommand
            dateFromParts(val: any): DatabaseAggregateCommand
            dateToParts(val: any): DatabaseAggregateCommand
            dateFromString(val: any): DatabaseAggregateCommand
            dateToString(val: any): DatabaseAggregateCommand
            dayOfMonth(val: any): DatabaseAggregateCommand
            dayOfWeek(val: any): DatabaseAggregateCommand
            dayOfYear(val: any): DatabaseAggregateCommand
            divide(val: any): DatabaseAggregateCommand
            eq(val: any): DatabaseAggregateCommand
            exp(val: any): DatabaseAggregateCommand
            filter(val: any): DatabaseAggregateCommand
            first(val: any): DatabaseAggregateCommand
            floor(val: any): DatabaseAggregateCommand
            gt(val: any): DatabaseAggregateCommand
            gte(val: any): DatabaseAggregateCommand
            hour(val: any): DatabaseAggregateCommand
            ifNull(val: any): DatabaseAggregateCommand
            in(val: any): DatabaseAggregateCommand
            indexOfArray(val: any): DatabaseAggregateCommand
            indexOfBytes(val: any): DatabaseAggregateCommand
            indexOfCP(val: any): DatabaseAggregateCommand
            isArray(val: any): DatabaseAggregateCommand
            isoDayOfWeek(val: any): DatabaseAggregateCommand
            isoWeek(val: any): DatabaseAggregateCommand
            isoWeekYear(val: any): DatabaseAggregateCommand
            last(val: any): DatabaseAggregateCommand
            let(val: any): DatabaseAggregateCommand
            literal(val: any): DatabaseAggregateCommand
            ln(val: any): DatabaseAggregateCommand
            log(val: any): DatabaseAggregateCommand
            log10(val: any): DatabaseAggregateCommand
            lt(val: any): DatabaseAggregateCommand
            lte(val: any): DatabaseAggregateCommand
            ltrim(val: any): DatabaseAggregateCommand
            map(val: any): DatabaseAggregateCommand
            max(val: any): DatabaseAggregateCommand
            mergeObjects(val: any): DatabaseAggregateCommand
            meta(val: any): DatabaseAggregateCommand
            min(val: any): DatabaseAggregateCommand
            millisecond(val: any): DatabaseAggregateCommand
            minute(val: any): DatabaseAggregateCommand
            mod(val: any): DatabaseAggregateCommand
            month(val: any): DatabaseAggregateCommand
            multiply(val: any): DatabaseAggregateCommand
            neq(val: any): DatabaseAggregateCommand
            not(val: any): DatabaseAggregateCommand
            objectToArray(val: any): DatabaseAggregateCommand
            or(val: any): DatabaseAggregateCommand
            pow(val: any): DatabaseAggregateCommand
            push(val: any): DatabaseAggregateCommand
            range(val: any): DatabaseAggregateCommand
            reduce(val: any): DatabaseAggregateCommand
            reverseArray(val: any): DatabaseAggregateCommand
            rtrim(val: any): DatabaseAggregateCommand
            second(val: any): DatabaseAggregateCommand
            setDifference(val: any): DatabaseAggregateCommand
            setEquals(val: any): DatabaseAggregateCommand
            setIntersection(val: any): DatabaseAggregateCommand
            setIsSubset(val: any): DatabaseAggregateCommand
            setUnion(val: any): DatabaseAggregateCommand
            size(val: any): DatabaseAggregateCommand
            slice(val: any): DatabaseAggregateCommand
            split(val: any): DatabaseAggregateCommand
            sqrt(val: any): DatabaseAggregateCommand
            stdDevPop(val: any): DatabaseAggregateCommand
            stdDevSamp(val: any): DatabaseAggregateCommand
            strcasecmp(val: any): DatabaseAggregateCommand
            strLenBytes(val: any): DatabaseAggregateCommand
            strLenCP(val: any): DatabaseAggregateCommand
            substr(val: any): DatabaseAggregateCommand
            substrBytes(val: any): DatabaseAggregateCommand
            substrCP(val: any): DatabaseAggregateCommand
            subtract(val: any): DatabaseAggregateCommand
            sum(val: any): DatabaseAggregateCommand
            switch(val: any): DatabaseAggregateCommand
            toBool(val: any): DatabaseAggregateCommand
            toDate(val: any): DatabaseAggregateCommand
            toDecimal(val: any): DatabaseAggregateCommand
            toDouble(val: any): DatabaseAggregateCommand
            toInt(val: any): DatabaseAggregateCommand
            toLong(val: any): DatabaseAggregateCommand
            toObjectId(val: any): DatabaseAggregateCommand
            toString(val: any): DatabaseAggregateCommand
            toLower(val: any): DatabaseAggregateCommand
            toUpper(val: any): DatabaseAggregateCommand
            trim(val: any): DatabaseAggregateCommand
            trunc(val: any): DatabaseAggregateCommand
            type(val: any): DatabaseAggregateCommand
            week(val: any): DatabaseAggregateCommand
            year(val: any): DatabaseAggregateCommand
            zip(val: any): DatabaseAggregateCommand
        }
    }

    class DatabaseAggregateCommand {}

    enum LOGIC_COMMANDS_LITERAL {
        AND = 'and',
        OR = 'or',
        NOT = 'not',
        NOR = 'nor'
    }

    class DatabaseLogicCommand {
        and(...expressions: DatabaseLogicCommand[]): DatabaseLogicCommand
        or(...expressions: DatabaseLogicCommand[]): DatabaseLogicCommand
        nor(...expressions: DatabaseLogicCommand[]): DatabaseLogicCommand
        not(expression: DatabaseLogicCommand): DatabaseLogicCommand
    }

    enum QUERY_COMMANDS_LITERAL {
        // comparison
        EQ = 'eq',
        NEQ = 'neq',
        GT = 'gt',
        GTE = 'gte',
        LT = 'lt',
        LTE = 'lte',
        IN = 'in',
        NIN = 'nin',
        // geo
        GEO_NEAR = 'geoNear',
        GEO_WITHIN = 'geoWithin',
        GEO_INTERSECTS = 'geoIntersects',
        // element
        EXISTS = 'exists',
        // evaluation
        MOD = 'mod',
        // array
        ALL = 'all',
        ELEM_MATCH = 'elemMatch',
        SIZE = 'size'
    }

    class DatabaseQueryCommand extends DatabaseLogicCommand {
        eq(val: any): DatabaseLogicCommand
        neq(val: any): DatabaseLogicCommand
        gt(val: any): DatabaseLogicCommand
        gte(val: any): DatabaseLogicCommand
        lt(val: any): DatabaseLogicCommand
        lte(val: any): DatabaseLogicCommand
        in(val: any[]): DatabaseLogicCommand
        nin(val: any[]): DatabaseLogicCommand

        exists(val: boolean): DatabaseLogicCommand

        mod(divisor: number, remainder: number): DatabaseLogicCommand

        all(val: any[]): DatabaseLogicCommand
        elemMatch(val: any): DatabaseLogicCommand
        size(val: number): DatabaseLogicCommand

        geoNear(options: IGeoNearCommandOptions): DatabaseLogicCommand
        geoWithin(options: IGeoWithinCommandOptions): DatabaseLogicCommand
        geoIntersects(
            options: IGeoIntersectsCommandOptions
        ): DatabaseLogicCommand
    }

    enum PROJECTION_COMMANDS_LITERAL {
        SLICE = 'slice'
    }

    class DatabaseProjectionCommand {}

    enum UPDATE_COMMANDS_LITERAL {
        // field
        SET = 'set',
        REMOVE = 'remove',
        INC = 'inc',
        MUL = 'mul',
        MIN = 'min',
        MAX = 'max',
        RENAME = 'rename',
        // bitwise
        BIT = 'bit',
        // array
        PUSH = 'push',
        POP = 'pop',
        SHIFT = 'shift',
        UNSHIFT = 'unshift',
        ADD_TO_SET = 'addToSet',
        PULL = 'pull',
        PULL_ALL = 'pullAll'
    }

    class DatabaseUpdateCommand {}

    class Batch {}

    /**
     * A contract that all API provider must adhere to
     */
    class APIBaseContract<
        PromiseReturn,
        CallbackReturn,
        Param extends IAPIParam,
        Context = any
    > {
        getContext(param: Param): Context

        /**
         * In case of callback-style invocation, this function will be called
         */
        getCallbackReturn(param: Param, context: Context): CallbackReturn

        getFinalParam<T extends Param>(param: Param, context: Context): T

        run<T extends Param>(param: T): Promise<PromiseReturn>
    }

    interface IGeoPointConstructor {
        new (longitude: number, latitide: number): GeoPoint
        new (geojson: IGeoJSONPoint): GeoPoint
        (longitude: number, latitide: number): GeoPoint
        (geojson: IGeoJSONPoint): GeoPoint
    }

    interface IGeoMultiPointConstructor {
        new (points: GeoPoint[] | IGeoJSONMultiPoint): GeoMultiPoint
        (points: GeoPoint[] | IGeoJSONMultiPoint): GeoMultiPoint
    }

    interface IGeoLineStringConstructor {
        new (points: GeoPoint[] | IGeoJSONLineString): GeoLineString
        (points: GeoPoint[] | IGeoJSONLineString): GeoLineString
    }

    interface IGeoMultiLineStringConstructor {
        new (
            lineStrings: GeoLineString[] | IGeoJSONMultiLineString
        ): GeoMultiLineString
        (
            lineStrings: GeoLineString[] | IGeoJSONMultiLineString
        ): GeoMultiLineString
    }

    interface IGeoPolygonConstructor {
        new (lineStrings: GeoLineString[] | IGeoJSONPolygon): GeoPolygon
        (lineStrings: GeoLineString[] | IGeoJSONPolygon): GeoPolygon
    }

    interface IGeoMultiPolygonConstructor {
        new (polygons: GeoPolygon[] | IGeoJSONMultiPolygon): GeoMultiPolygon
        (polygons: GeoPolygon[] | IGeoJSONMultiPolygon): GeoMultiPolygon
    }

    interface IGeo {
        Point: IGeoPointConstructor
        MultiPoint: IGeoMultiPointConstructor
        LineString: IGeoLineStringConstructor
        MultiLineString: IGeoMultiLineStringConstructor
        Polygon: IGeoPolygonConstructor
        MultiPolygon: IGeoMultiPolygonConstructor
    }

    interface IGeoJSONPoint {
        type: 'Point'
        coordinates: [number, number]
    }

    interface IGeoJSONMultiPoint {
        type: 'MultiPoint'
        coordinates: Array<[number, number]>
    }

    interface IGeoJSONLineString {
        type: 'LineString'
        coordinates: Array<[number, number]>
    }

    interface IGeoJSONMultiLineString {
        type: 'MultiLineString'
        coordinates: Array<Array<[number, number]>>
    }

    interface IGeoJSONPolygon {
        type: 'Polygon'
        coordinates: Array<Array<[number, number]>>
    }

    interface IGeoJSONMultiPolygon {
        type: 'MultiPolygon'
        coordinates: Array<Array<Array<[number, number]>>>
    }

    type IGeoJSONObject =
        | IGeoJSONPoint
        | IGeoJSONMultiPoint
        | IGeoJSONLineString
        | IGeoJSONMultiLineString
        | IGeoJSONPolygon
        | IGeoJSONMultiPolygon

    abstract class GeoPoint {
        longitude: number
        latitude: number

        constructor(longitude: number, latitude: number)

        toJSON(): Record<string, any>
        toString(): string
    }

    abstract class GeoMultiPoint {
        points: GeoPoint[]

        constructor(points: GeoPoint[])

        toJSON(): IGeoJSONMultiPoint
        toString(): string
    }

    abstract class GeoLineString {
        points: GeoPoint[]

        constructor(points: GeoPoint[])

        toJSON(): IGeoJSONLineString
        toString(): string
    }

    abstract class GeoMultiLineString {
        lines: GeoLineString[]

        constructor(lines: GeoLineString[])

        toJSON(): IGeoJSONMultiLineString
        toString(): string
    }

    abstract class GeoPolygon {
        lines: GeoLineString[]

        constructor(lines: GeoLineString[])

        toJSON(): IGeoJSONPolygon
        toString(): string
    }

    abstract class GeoMultiPolygon {
        polygons: GeoPolygon[]

        constructor(polygons: GeoPolygon[])

        toJSON(): IGeoJSONMultiPolygon
        toString(): string
    }

    type GeoInstance =
        | GeoPoint
        | GeoMultiPoint
        | GeoLineString
        | GeoMultiLineString
        | GeoPolygon
        | GeoMultiPolygon

    interface IGeoNearCommandOptions {
        geometry: GeoPoint
        maxDistance?: number
        minDistance?: number
    }

    interface IGeoWithinCommandOptions {
        geometry: GeoPolygon | GeoMultiPolygon
    }

    interface IGeoIntersectsCommandOptions {
        geometry:
            | GeoPoint
            | GeoMultiPoint
            | GeoLineString
            | GeoMultiLineString
            | GeoPolygon
            | GeoMultiPolygon
    }

    interface IServerDateOptions {
        offset: number
    }

    abstract class ServerDate {
        readonly options: IServerDateOptions
        constructor(options?: IServerDateOptions)
    }

    interface IRegExpOptions {
        regexp: string
        options?: string
    }

    interface IRegExpConstructor {
        new (options: IRegExpOptions): RegExp
        (options: IRegExpOptions): RegExp
    }

    abstract class RegExp {
        readonly regexp: string
        readonly options: string
        constructor(options: IRegExpOptions)
    }

    type DocumentId = string | number

    interface IDocumentData {
        _id?: DocumentId
        [key: string]: any
    }

    type IDBAPIParam = IAPIParam

    interface IAddDocumentOptions extends IDBAPIParam {
        data: IDocumentData
    }

    type IGetDocumentOptions = IDBAPIParam

    type ICountDocumentOptions = IDBAPIParam

    interface IUpdateDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition
    }

    interface IUpdateSingleDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition
    }

    interface ISetDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition
    }

    interface ISetSingleDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition
    }

    interface IRemoveDocumentOptions extends IDBAPIParam {
        query: IQueryCondition
    }

    type IRemoveSingleDocumentOptions = IDBAPIParam

    interface IWatchOptions {
        // server realtime data init & change event
        onChange: (snapshot: ISnapshot) => void
        // error while connecting / listening
        onError: (error: any) => void
    }

    interface ISnapshot {
        id: number
        docChanges: ISingleDBEvent[]
        docs: Record<string, any>
        type?: SnapshotType
    }

    type SnapshotType = 'init'

    interface ISingleDBEvent {
        id: number
        dataType: DataType
        queueType: QueueType
        docId: string
        doc: Record<string, any>
        updatedFields?: Record<string, any>
        removedFields?: string[]
    }

    type DataType = 'init' | 'update' | 'replace' | 'add' | 'remove' | 'limit'

    type QueueType = 'init' | 'enqueue' | 'dequeue' | 'update'

    interface IQueryCondition {
        [key: string]: any
    }

    type IStringQueryCondition = string

    interface IQueryResult extends IAPISuccessParam {
        data: IDocumentData[]
    }

    interface IQuerySingleResult extends IAPISuccessParam {
        data: IDocumentData
    }

    interface IUpdateCondition {
        [key: string]: any
    }

    type IStringUpdateCondition = string

    interface IAddResult extends IAPISuccessParam {
        _id: DocumentId
    }

    interface IUpdateResult extends IAPISuccessParam {
        stats: {
            updated: number
            // created: number,
        }
    }

    interface ISetResult extends IAPISuccessParam {
        _id: DocumentId
        stats: {
            updated: number
            created: number
        }
    }

    interface IRemoveResult extends IAPISuccessParam {
        stats: {
            removed: number
        }
    }

    interface ICountResult extends IAPISuccessParam {
        total: number
    }
}

type Optional<T> = { [K in keyof T]+?: T[K] }

type OQ<
    T extends Optional<
        Record<'complete' | 'success' | 'fail', (...args: any[]) => any>
    >
> =
    | (RQ<T> & Required<Pick<T, 'success'>>)
    | (RQ<T> & Required<Pick<T, 'fail'>>)
    | (RQ<T> & Required<Pick<T, 'complete'>>)
    | (RQ<T> & Required<Pick<T, 'success' | 'fail'>>)
    | (RQ<T> & Required<Pick<T, 'success' | 'complete'>>)
    | (RQ<T> & Required<Pick<T, 'fail' | 'complete'>>)
    | (RQ<T> & Required<Pick<T, 'fail' | 'complete' | 'success'>>)

type RQ<
    T extends Optional<
        Record<'complete' | 'success' | 'fail', (...args: any[]) => any>
    >
> = Pick<T, Exclude<keyof T, 'complete' | 'success' | 'fail'>>
