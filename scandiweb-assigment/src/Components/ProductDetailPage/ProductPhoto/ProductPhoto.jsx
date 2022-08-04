import React, { PureComponent } from "react";
import s from "./ProductPhoto.module.css";

class ProductPhoto extends PureComponent {
  state = {
    SelectedPhoto: 0,
  };

  onSelectedPhotoChange = (index) => {
    this.setState({ SelectedPhoto: index });
  };

  render() {
    return (
      <div className={s.ProductPhoto}>
        <div className={s.GalleryWrapper}>
          <div className={s.Gallery}>
            {this.props.gallery.map((photo, index) => (
              <div
                key={index}
                className={s.GalleryItem}
                onClick={() => this.onSelectedPhotoChange(index)}
              >
                <img src={photo} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className={s.SelectedPhoto}>
          <img src={this.props.gallery[this.state.SelectedPhoto]} alt="" />
        </div>
      </div>
    );
  }
}

export default ProductPhoto;
