import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateFeedPage } from './create-feed';

@NgModule({
  declarations: [
    CreateFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateFeedPage),
  ],
})
export class CreateFeedPageModule {}
