import { NgModule } from '@angular/core';
import { IconCardsComponent } from './icon-cards/icon-cards.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageCardsComponent } from './image-cards/image-cards.component';
import { ImageOverlayComponent } from './image-overlay/image-overlay.component';
import { ImageCardListComponent } from './image-card-list/image-card-list.component';
import { TabCardsComponent } from './tab-cards/tab-cards.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    IconCardsComponent,
    ImageCardsComponent,
    ImageOverlayComponent,
    ImageCardListComponent,
    TabCardsComponent,
    UserCardsComponent
  ],
  imports: [SharedModule, TabsModule.forRoot()],
  providers: [],
  exports: [
    IconCardsComponent,
    ImageCardsComponent,
    ImageOverlayComponent,
    ImageCardListComponent,
    TabCardsComponent,
    UserCardsComponent
  ]
})

export class UiCardsContainersModule { }
