import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    // console.log('queryParams', this.route.snapshot.queryParams);
    // console.log('fragm', this.route.snapshot.fragment);
    // console.log('params', this.route.snapshot.params);
    // this.route.fragment.subscribe(value => console.log(value));
    this.route.queryParams
      .subscribe((qParams: Params) => {
        this.allowEdit = qParams['allowEdit'] === '1';
      });
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    !this.allowEdit && setTimeout(() => {
      this.router.navigate(['../'], {relativeTo: this.route});
    }, 2000);
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivateMeth(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
