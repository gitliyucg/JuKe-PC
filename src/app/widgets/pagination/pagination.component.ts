import { Component, DoCheck, Input} from '@angular/core';
import {Pagination} from "./pageconfig";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements DoCheck {
  @Input()
  public pagination: Pagination = Pagination.defaultPagination;

  public pageNum: number;
  public pageList: any[];
  public pagego: number;

  private oldTotalItems: number = 0;

  public changeCurrentPage(item: any): void {
    if (typeof item === 'number') {
      this.pagination.currentPage = item;
      this.pagination.changePage();
      this.initPageList();
    }
  }

  public prePage(): void {
    if (this.pagination.currentPage != 1) {
      this.changeCurrentPage(this.pagination.currentPage - 1);
    }
  }

  public nextPage(): void {
    if (this.pagination.currentPage < this.pageNum) {
      this.changeCurrentPage(this.pagination.currentPage + 1);
    }
  }

  public initPageList(): void {
    // 偏移量（因为要除去首页和尾页，所以要-1）
    let offset = Math.floor(this.pagination.pageLength / 2) - 1;
    // 如果没有数据显示一页
    this.pagination.totalItems = this.pagination.totalItems > 0 ? this.pagination.totalItems : 1;
    // 总页数
    this.pageNum = Math.ceil(this.pagination.totalItems / this.pagination.pageItems);
    this.pageList = [];
    if (this.pageNum <= this.pagination.pageLength) {
      for (let i = 1; i <= this.pageNum; i++) {
        this.pageList.push(i);
      }
    } else {
      if (this.pagination.currentPage <= offset) {
        for (let i = 1; i <= this.pagination.pageLength - 2; i++) {
          this.pageList.push(i);
        }
        this.pageList.push('...');
      } else if (this.pagination.currentPage >= this.pageNum - offset) {
        this.pageList.push(1);
        this.pageList.push('...');
        for (let i = offset + 2; i >= 1; i--) {
          this.pageList.push(this.pageNum - i);
        }
      } else {
        this.pageList.push(1);
        this.pageList.push('...');
        for (let i = Math.ceil(offset / 2); i >= 1; i--) {
          this.pageList.push(this.pagination.currentPage - i);
        }
        this.pageList.push(this.pagination.currentPage);
        for (let i = 1; i <= offset / 2; i++) {
          this.pageList.push(this.pagination.currentPage + i);
        }
        this.pageList.push('...');
      }
      this.pageList.push(this.pageNum);

    }
  }

  ngDoCheck(): void {
    if (this.pagination.totalItems != this.oldTotalItems) {
      this.initPageList();
      this.oldTotalItems = this.pagination.totalItems;
    }

    if (this.pagination.currentPage > this.pageNum) {
      this.pagination.currentPage = this.pageNum;
      this.pagination.changePage();
    }
  }

  go() {
    if(this.pagego > 0 && this.pagego <= this.pageNum)
    {
      this.changeCurrentPage(this.pagego);
    }

  }
}
