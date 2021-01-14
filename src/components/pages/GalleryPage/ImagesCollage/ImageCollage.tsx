const ImageCollage = () => {
//     return (
//         <div className="hero is-fullheight is-bold is-info">
//             <div className="hero-body">
//                 <div className="container">
//                     <div className="header content">
//                         <h2 className="subtitle is-6">Code Challenge #16</h2>
//                         <h1 className="title is-1">Infinite Scroll Unsplash Code Challenge</h1>
//                     </div>
//                     <InfiniteScroll
//                         dataLength={images}
//                         next={() => fetchImages(5)}
//                         hasMore={true}
//                         loader={
//                         <img
//                             src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
//                             alt="loading"
//                         />}
//                     >
//                         <div className="image-grid" style={{ marginTop: "30px" }}>
//                             {loaded ?
//                                 images.map((image, index) => (
//                                     <div className="image-item" key={key} >
//                                         <img src={url} />
//                                     </div>
//                                 )): ""}
//                         </div>
//                     </InfiniteScroll>
//                 </div>
//             </div>
//         </div>
//     );
}

export default ImageCollage;