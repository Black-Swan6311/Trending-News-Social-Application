import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
      HttpClientModule,
      FormsModule, ReactiveFormsModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class SettingModule { }
