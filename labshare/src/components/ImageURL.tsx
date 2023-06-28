// const handlePaste = async (event) => {
//     const clipboardData = event.clipboardData || window.clipboardData; // クリップボードのデータにアクセス
//     const items = clipboardData.items;
//     console.log(items.lenght)
//     for (let i = 0; i < items.length; i++) {
//       const item = items[i];
//       if (item.type.indexOf("image") !== -1) {
//         const blob = item.getAsFile();
//         const imageURL = URL.createObjectURL(blob);
//         // <img>要素を作成し画像を埋め込み
//         const imgElement = document.createElement("img");
//         imgElement.src = imageURL;
//         document.body.appendChild(imgElement);
        
//         // ファイル形式に変換
//         const formData = new FormData();
//         formData.append("image", blob);
//         // サーバーへのアップロード処理を実行
//         const response = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/UpLoad`, {
//           method: 'POST',
//           body: formData,
//         });
//       }
//     }
//   };

const ImageURL = async (file:any) => {
      console.log(typeof file)
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/ImageUpLoad`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: formData,
      });
      console.log(response)
      return response.filename
    }

  export default ImageURL