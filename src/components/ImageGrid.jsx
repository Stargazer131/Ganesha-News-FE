const parseImageData = (data) => {
  return data.map((item) => {
    const prefix = "IMAGECONTENT:";
    const [imageUrl, positions] = item.slice(prefix.length).split(";;");
    const [row, column] = positions.split(",");
    return { imageUrl, row: parseInt(row), column: parseInt(column) };
  });
};

const ImageGrid = ({ imageList }) => {
  const images = parseImageData(imageList);

  // Group images by row
  const rows = images.reduce((acc, image) => {
    acc[image.row] = acc[image.row] || [];
    acc[image.row].push(image);
    return acc;
  }, {});

  console.log(rows[1][rows[1].length - 1]);

  const gridColsClass = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  };

  return (
    <div className="mb-4 space-y-4">
      {Object.keys(rows).map((row) => (
        <div
          key={row}
          className={`grid grid-cols-1 gap-4 ${
            gridColsClass[rows[row][rows[row].length - 1].column]
          }`}
        >
          {rows[row].map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={`Image ${index + 1}`}
              className="w-full h-auto"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
