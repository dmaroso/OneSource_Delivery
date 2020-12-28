export interface Item {
    id : string;
    description : String;
    price : number;
    url : String;
    quantity: number;
}

// export class ItemConverter {
//     public static krogerItemToItem(input : any) : Item {
//         let i : Item =
//           {
//             id: 0,
//             description: '',
//             price: 0,
//             url: '',
//             quantity: 1
//           }
    
//           i.id = input.productId;
//           i.description = input.description;
//           i.price = input.items[0].price.regular;
//           let images: any[] = input.images;
//           images.forEach(element => {
//           if (element.perspective == 'front') {
//             element.sizes.forEach((url: { size: string; url: string; }) => {
//               if (url.size == 'large') {
//                 i.url = url.url;
//               }
//             })
//           }
//           });
//           return i;
//       }
// }