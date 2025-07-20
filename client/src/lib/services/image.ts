const uploadImage = async (file: File, folder = 'defaultFolder'): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/image?folder=${encodeURIComponent(folder)}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Image upload failed: ${errorText}`);
  }

  const data = await response.json();
  return data.url;
};

export default uploadImage;
