import { Component, OnInit } from '@angular/core';
import {MenuServiceService} from '../services/menu-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-create-menu-gather',
  templateUrl: './create-menu-gather.component.html',
  styleUrls: ['./create-menu-gather.component.css'],
  providers: [MenuServiceService]
})
export class CreateMenuGatherComponent implements OnInit {
  warn: string;
  Formdata:any;
  creater_id:any;
  constructor(
    private router: Router,
    private menuD: MenuServiceService,
  ) {
  }

  ngOnInit() {
    const that = this;
    that.creater_id= sessionStorage.getItem('ID');
    if (!sessionStorage.getItem('ID')) {
      that.router.navigate(['/login']);
    }
  }

  change(e) {
    const file = e.target.files[0];
    const path = file.type;
    const Path = path.substr(path.lastIndexOf('/')).toUpperCase();
    if (Path == '/JPG' || Path == '/PNG' || Path == '/JPEG') {
      this.preview(file);
      this.warn = '';
    } else {
      this.warn = '你上传的不是图片~';
    }
  }
  preview(file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    const url = img.src;
    const $img = $(img);
    img.onload = function () {
      URL.revokeObjectURL(url);
      $img.addClass('fitcss');
      $('.preview').empty().append($img);
    };
  }

  UpdateInfo(e){
    const that = this;

    that.Formdata = new FormData(e.target.parentElement.parentElement);
    that.menuD.addList(that.Formdata, function (result) {
      console.log(result);
      that.router.navigate(['/personal-center/' + that.creater_id + '/my-menu' ]);
    });
  }
}
