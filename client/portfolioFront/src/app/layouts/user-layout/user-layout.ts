import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { App } from '../../app';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-user-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css'
})
export class UserLayout {

}
