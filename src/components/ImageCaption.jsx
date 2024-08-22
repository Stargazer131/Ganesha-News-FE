const ImageCaption = ({ imgUrl, caption }) => {
  return (
    <figure className="flex flex-col items-center mb-4">
      <img
        src={imgUrl}
        alt={caption || "Image"}
        className="h-auto max-w-full mb-2"
      />
      <figcaption className="text-sm text-center text-gray-600">
        {caption}
      </figcaption>
    </figure>
  );
};

export default ImageCaption;
