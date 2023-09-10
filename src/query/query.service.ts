import { count } from "console";
import { queryData } from "../../Model/data-model";
import { getContent } from "../services/chatgpt.service";

export class QueryService{

    public async getDataPoints(query: string): Promise<any>{
        const standardizedQuery = query.trim().toUpperCase()

        const queryExists = await queryData.findOne({query: standardizedQuery})

        if (queryExists){
            await queryData.findOneAndUpdate({_id: queryExists._id}, {$inc: {'queriedCount' : 1}}, {new: true})
            return queryExists.dataPoints
        }

        const unFormattedDataPoints = await getContent(`Give me datapoints on ${query}`)

        const {content} = unFormattedDataPoints.choices[0].message

        if (!content){
            return "Datapoints were not retrieved, Please try searching again"
        }

        const formattedDataPoints = content.split(/\n\d+\.\s+/).slice(1).map(entry => entry.trim().replace(/\n/g, ' '));

        await queryData.create({query: standardizedQuery, dataPoints: formattedDataPoints})

        return formattedDataPoints
    }

    public async getSuggestions(query: string): Promise<any>{
        const unFormattedDataPoints = await getContent(`My query was ${query}. Give me suggestions for the most relatable queries that i can query about again`)

        const {content} = unFormattedDataPoints.choices[0].message

        const formattedDataPoints = content.split(/\n\d+\.\s+/).slice(1).map(entry => entry.trim().replace(/\n["']/g, ' '));;

        return formattedDataPoints
    }

    public async getTopQueries(): Promise<any>{
        const topQueriesObj = await queryData.find().sort({queriedCount:-1}).limit(5)

       const topQueries = topQueriesObj.reduce((top, query)=>{
        top.push(query.query)

        return top
        }, [])

        return topQueries
    }


} 