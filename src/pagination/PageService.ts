import {RequestPaginationFilter, SortOrder} from "./RequestPaginationFilter";
import {FindOptionsWhere, Repository} from "typeorm";

export class PageService {
  protected createOrderQuery(filter: RequestPaginationFilter) {
    const order: any = {};

    if (filter.orderBy) {
      order[filter.orderBy] = filter.sortOrder;
      return order;
    }

    order.createdTimestamp = SortOrder.DESC;
    return order;
  }

  protected async paginate<T>(
    repository: Repository<T>,
    filter: RequestPaginationFilter,
    where: FindOptionsWhere<T>,
  ) {
    console.log(`page: ${filter.page}`)
    console.log(`pageSize: ${filter.pageSize}`)
    console.log(`order: ${this.createOrderQuery(filter)}`)
    console.log(`skip calculation: ${(filter.page - 1) * (filter.pageSize + 1)}`)
    const [objects, total] = await repository.findAndCount({
      order: this.createOrderQuery(filter),
      skip: ((filter.page != undefined ? filter.page : 1) - 1) * (filter.pageSize != undefined ? filter.pageSize : 3),
      take: (filter.pageSize != undefined ? filter.pageSize : 3),
      where: where,
    });
    return {
      objects,
      total: total
    }
  }

}