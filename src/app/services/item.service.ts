import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/Item';

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs:AngularFirestore) { 

    //this.items = this.afs.collection('storeItems').valueChanges();

        this.itemsCollection = this.afs.collection('storeItems', ref => ref.orderBy('name','asc'));
        this.items = this.itemsCollection.snapshotChanges().map(changes => { 
        return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      } ) 
    });
  }

  getItems(){
    return this.items;
  }

  addItem(item: Item){
      this.itemsCollection.add(item);
      console.log('ITEM ADDED');
  }

  deleteItem(item: Item){
      this.itemDoc = this.afs.doc(`storeItems/${item.id}`);
      this.itemDoc.delete();
      console.log('ITEM DELETED');
  }
    
  updateItem(item: Item){
    this.itemDoc = this.afs.doc(`storeItems/${item.id}`);
    this.itemDoc.update(item);
    console.log('ITEM UPDATED');
  }
  
}
