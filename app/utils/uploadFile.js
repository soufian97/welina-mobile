export function dataImageAppender(data) {
  const dataImage = new FormData();
  dataImage.append('file', {
    name: `${new Date().getTime()}.jpg`,
    type: data.mime,
    uri: data.path,
  });
  return dataImage;
}
