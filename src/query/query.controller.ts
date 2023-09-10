import {
    Controller,
    Route,
    Get,
    Security,
    Request,
    Path,
    Post,
    Body,
    Put,
    Tags,
    Query,
    Delete,
  } from "tsoa";
import { QueryReqDto } from "./query.dto";
import { QueryService } from "./query.service";
  
  
  @Tags("Query")
  @Route("/query")
  export class QueryController extends Controller {
    private readonly queryService: QueryService;
  
    constructor() {
      super();
      this.queryService = new QueryService();
    }
  
    @Post("/")
    public async getDataPoints(@Body() body: QueryReqDto): Promise<any> {
      return await this.queryService.getDataPoints(body.query)
    }

    @Post("/suggestions")
    public async getSuggestions(@Body() body: QueryReqDto): Promise<any> {
      return await this.queryService.getSuggestions(body.query)
    }

    @Get("/trends")
    public async getTrends(): Promise<any> {
      return await this.queryService.getTopQueries()
    }
  }
  