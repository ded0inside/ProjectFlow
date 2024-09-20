import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
 constructor(private userSrv: UserService) {
  this.userSrv.getUserData().subscribe((res:any) => {
    this.firstname = res.first_name;
    this.lastname = res.last_name;
    this.username = res.username;
    this.email = res.email;
  })
 }
 firstname:string = '';
 lastname:string = '';
 username:string = '';
 email:string = '';

 userData:any;
}
