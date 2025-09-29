import Styles from './gallery.module.scss';
import { useState } from 'react';
import { GalleryModal } from './GalleryModal';

type TPhoto = {
  src: string;
  id: number;
  alt: string;
};

type TProps = {
  photos: TPhoto[];
};

export const Gallery = ({ photos = [] }: TProps) => {
  const [showPhotoId, setShowPhotoId] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const showPhoto = photos.find((photo) => photo.id === showPhotoId);

  const nextSlide = () => {
    setShowPhotoId((prev) => {
      let nextValue = prev + 1;
      return nextValue > photos.length ? 1 : nextValue;
    });
  };

  const previousSlide = () => {
    setShowPhotoId((prev) => {
      let prevValue = prev - 1;
      return prevValue === 0 ? photos.length : prevValue;
    });
  };

  const handleCloseModal = (lastViewedPhotoId: number) => {
    setShowPhotoId(lastViewedPhotoId);
    setIsOpenModal(false);
  };

  return (
    <div className={Styles.slider}>
      <div className={Styles.item}>
        <img className={Styles.thumbnail} src={showPhoto.src} alt={showPhoto.alt} onClick={() => setIsOpenModal(true)} />
      </div>

      {photos.length > 1 && (
        <>
          <a className={Styles.previous} onClick={previousSlide}>
            &#10094;
          </a>
          <a className={Styles.next} onClick={nextSlide}>
            &#10095;
          </a>
        </>
      )}
      {isOpenModal && (
        <GalleryModal
          openPhotoId={showPhotoId}
          photos={photos}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
