import React, { useState, useCallback, FC } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg, getRotatedImage } from "./canvasUtils";
import { useStyles } from "./style";
import { UploadButton } from "../UploadButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { ImageList } from "..";
import { useTranslation } from "react-i18next";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  var b: any = theBlob;

  b.lastModifiedDate = new Date();
  b.name = fileName;

  return theBlob as File;
};

const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

interface IProps {
  onChange: (v: any) => void;
  defaultImages?: File[];
}

export const ImageUploader: FC<IProps> = ({ onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [imageSrcs, setImageSrcs] = useState([]);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [rawImages, setRawImages] = useState([]);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrcs[selectedIdx],
        croppedAreaPixels,
        rotation
      );

      const updatedSrcs = [...imageSrcs];
      // @ts-ignore
      updatedSrcs[selectedIdx] = croppedImage;
      const rawFiles = updatedSrcs.map((el) => dataURLtoFile(el, "img"));

      setZoom(1);
      setRotation(0);
      setImageSrcs(updatedSrcs);
      setRawImages(rawFiles as any);

      onChange(rawFiles);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrcs, croppedAreaPixels, rotation]);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      const newFilesArr = Array.from(files) as File[];
      const allFilesArr = [...rawImages, ...newFilesArr];

      setRawImages(allFilesArr as any);
      onChange(allFilesArr);

      const imageDataUrls: any[] = [];
      for (let f of newFilesArr) {
        let imageDataUrl = await readFile(f);

        const orientation = await getOrientation(f);
        const rotation = ORIENTATION_TO_ANGLE[orientation];
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
        imageDataUrls.push(imageDataUrl);
      }
      setImageSrcs([...imageSrcs, ...imageDataUrls] as any);
    }
  };

  return (
    <div className={classes.wrapper}>
      {imageSrcs.length ? (
        <>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrcs[selectedIdx] as any}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={5 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                {t("action.zoom")}
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(_e, zoom) => setZoom(zoom as any)}
              />
            </div>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                {t("action.rotate")}
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(_e, rotation) => setRotation(rotation as any)}
              />
            </div>
            {true && (
              <Button
                onClick={cropImage}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
              >
                {t("action.crop")}
              </Button>
            )}
          </div>
          <ImageList
            files={rawImages}
            rawFiles={true}
            selectedIdx={selectedIdx}
            editable={true}
            onChange={(idx) => {
              setSelectedIdx(idx);
              setZoom(1);
              setRotation(0);
            }}
            onDelete={(idx) => {
              const newSelectedIdx = idx - 1 >= 0 ? idx - 1 : 0;
              setSelectedIdx(newSelectedIdx);
              setRawImages(rawImages.filter((_v, index) => index != idx));
              setImageSrcs(imageSrcs.filter((_v, index) => index != idx));
            }}
            onMoreUpload={onFileChange}
          />
        </>
      ) : (
        <UploadButton onChange={onFileChange}>
          <Button
            variant="outlined"
            color="default"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            {t("action.uploadPhoto")}
          </Button>
        </UploadButton>
      )}
    </div>
  );
};
