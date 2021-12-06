import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { GroupsService, Group} from 'src/app/common/services/groups.service';

@Component({
  selector: 'new-pages',
  templateUrl: './new-pages.component.html',
  styleUrls: ['./new-pages.component.scss']
})
export class NewPagesComponent implements OnInit {
  groups:Group | any

  constructor(private authService: AuthService, private groupService: GroupsService) { }

  ngOnInit(): void {
    this.groupService.getNotSubGroupsByUserId(this.authService.getId()).subscribe(groups=>{
      this.groups= groups;
    })
  }

}
