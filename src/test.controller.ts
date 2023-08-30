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
  import {queryData} from '../Model/data-model'
  
  
  @Tags("Query")
  @Route("/test")
  export class TestController extends Controller {
    // private readonly partnerServicesService: PartnerServicesService;
  
    constructor() {
      super();
    //   this.partnerServicesService = new PartnerServicesService();
    }

    @Get("/")
    public async testGet(): Promise<any> {
      const data = await queryData.create({query: "hello", dataPoints: "data"})
      return data;
    }
  
    @Post("/post")
    public async test(@Body() body: any): Promise<any> {
      return body;
    }
  }
  