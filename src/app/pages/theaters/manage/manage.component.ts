import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  theater:Theater;
  mode:number;
  theFormGroup: FormGroup;
  trySend:boolean=false;
  constructor(private theaterService:TheaterService,
              private router:Router,
              private activateRoute:ActivatedRoute,
              private theFormBuilder:FormBuilder,
            
  ) {
    this.theater= {id:0,location:"", capacity:0};
    // mode=1 --> view, mode=2 --> create, mode=3 --> update
    this.mode=0;
    this.trySend=false;
   }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id){
      this.theater.id = this.activateRoute.snapshot.params.id
      this.getTheater(this.theater.id);
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity:[0,[Validators.required,Validators.min(1),Validators.max(100)]],
      location:['',[Validators.required,Validators.minLength(2)]],
    })
  }
  // Esto me dice que regla se esta activando
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getTheater(id:number){
    this.theaterService.view(id).subscribe(
      (data)=>{
        this.theater = data
    })
  }

  create(){
    console.log(JSON.stringify(this.theater));
    this.theaterService.create(this.theater).subscribe(
      (data)=>{
        Swal.fire("Creado", "El teatro ha sido creado exitosamente", "success");
        this.router.navigate(["/theaters/list"]);
      }
    );
  }

  update(){
    console.log(JSON.stringify(this.theater));
    this.theaterService.create(this.theater).subscribe(
      (data)=>{
        Swal.fire("Creado", "El teatro ha sido actualizado exitosamente", "success");
        this.router.navigate(["/theaters/list"]);
      }
    );
  }

}
