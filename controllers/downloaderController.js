const axios = require("axios");

exports.downloadTikTokVideo = async (req, res) => {
  const { url } = req.query;

  console.log("TikTok Video Download Request URL:", url);

  if (!url) {
    console.log("TikTok URL not provided");
    return res.status(400).json({ status: false, message: "URL diperlukan" });
  }

  try {
    const response = await axios.post(
      "https://ssstik.io/abc?url=dl",
      new URLSearchParams({
        id: url,
        locale: "en",
        tt: "RHJHcms_",
      }).toString(),
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }
    );

    const html = response.data;
    const nowmMatch = html.match(
      /<a href="(https:\/\/tikcdn\.io\/ssstik\/[^"]+)"[^>]*without_watermark[^>]*>/
    );
    const downloadTiktokNowm = nowmMatch ? nowmMatch[1] : null;

    const mp3Match = html.match(
      /<a href="(https:\/\/tikcdn\.io\/ssstik\/[^"]+)"[^>]*music[^>]*>/
    );
    const downloadTiktokMp3 = mp3Match ? mp3Match[1] : null;

    const imgMatch = html.match(
      /<img class="result_author" src="([^"]+)" alt="([^"]+)">/
    );
    const creatorProfileImg = imgMatch ? imgMatch[1] : null;
    const creatorUsername = imgMatch ? imgMatch[2] : null;

    const descriptionMatch = html.match(/<p class="maintext">([^<]+)<\/p>/);
    const videoDescription = descriptionMatch ? descriptionMatch[1] : null;

    console.log("Download Links:", { downloadTiktokNowm, downloadTiktokMp3 }); // Debug: Log download links
    console.log("Creator Info:", {
      creatorProfileImg,
      creatorUsername,
      videoDescription,
    }); // Debug: Log creator info

    if (!downloadTiktokNowm && !downloadTiktokMp3) {
      console.log("No download links found"); // Debug: Log no links found
      return res
        .status(404)
        .json({ status: false, message: "Gagal menemukan tautan unduhan" });
    }

    return res.status(200).json({
      status: true,
      message: "Tautan unduhan ditemukan",
      data: [
        {
          downloadTiktokNowm,
          downloadTiktokMp3,
          creatorProfileImg,
          creatorUsername,
          videoDescription,
        },
      ],
    });
  } catch (error) {
    console.error("Error downloading TikTok video:", error);
    return res
      .status(500)
      .json({
        status: false,
        message: "Gagal mengunduh video",
        error: error.message,
      });
  }
};

exports.downloadInstagramStory = async (req, res) => {
  const { url } = req.query;

  console.log("Instagram Story Download Request URL:", url);

  if (!url) {
    console.log("Instagram Story URL not provided");
    return res
      .status(400)
      .json({ status: false, message: "URL Instagram diperlukan" });
  }

  try {
    const response = await axios.get(
      `https://snapinsta.guru/api/ig/story?url=${url}`
    );
    console.log("Instagram Story API Response:", response.data); // Debug: Log API response

    const result = response.data.result[0];
    if (result.video_versions && result.video_versions[0]) {
      const videoUrl = result.video_versions[0].url;
      console.log("Instagram Story Video URL:", videoUrl); // Debug: Log video URL
      return res.status(200).json({
        status: true,
        message: "Tautan unduhan Instagram Story ditemukan",
        data: {
          videoUrl,
        },
      });
    } else if (result.image_versions2 && result.image_versions2.candidates[0]) {
      const imageUrl = result.image_versions2.candidates[0].url;
      console.log("Instagram Story Image URL:", imageUrl); // Debug: Log image URL
      return res.status(200).json({
        status: true,
        message: "Tautan unduhan Instagram Story ditemukan",
        data: {
          imageUrl,
        },
      });
    } else {
      console.log("No Instagram Story download links found"); // Debug: Log no links found
      return res
        .status(404)
        .json({
          status: false,
          message: "Gagal menemukan tautan unduhan Instagram Story",
        });
    }
  } catch (error) {
    console.error("Error downloading Instagram Story:", error);
    return res
      .status(500)
      .json({
        status: false,
        message: "Gagal mengunduh Instagram Story",
        error: error.message,
      });
  }
};

exports.downloadInstagramPost = async (req, res) => {
  const { url } = req.query;

  console.log("Instagram Post Download Request URL:", url);

  if (!url) {
    console.log("Instagram Post URL not provided");
    return res
      .status(400)
      .json({ status: false, message: "URL Instagram diperlukan" });
  }

  try {
    const response = await axios.get(
      `https://aiovideodownloader.com/api/instagram?url=${url}`
    );
    const result = response.data;
    let posts = [];

    if (Array.isArray(result) && result.length > 0) {
      posts = result.map((post) => ({
        thumbnail_img: post.thumbnail,
        urldownload_img: post.newUrl,
      }));
      console.log("Instagram Post Data (Array):", posts); // Debug: Log post data array
    } else if (result && result.thumbnail && result.newUrl) {
      posts.push({
        thumbnail_img: result.thumbnail,
        urldownload_img: result.newUrl,
      });
      console.log("Instagram Post Data (Single):", posts); // Debug: Log single post data
    } else {
      console.log("No Instagram Post download links found"); // Debug: Log no links found
      return res
        .status(404)
        .json({
          status: false,
          message: "Gagal menemukan tautan unduhan Instagram Post",
        });
    }

    return res.status(200).json({
      status: true,
      message: "Tautan unduhan Instagram Post ditemukan",
      data: posts,
    });
  } catch (error) {
    console.error("Error downloading Instagram Post:", error);
    return res
      .status(500)
      .json({
        status: false,
        message: "Gagal mengunduh Instagram Post",
        error: error.message,
      });
  }
};

exports.downloadFacebookPost = async (req, res) => {
  const { url } = req.query;

  console.log("Facebook Post Download Request URL:", url);

  if (!url) {
    console.log("Facebook Post URL not provided");
    return res
      .status(400)
      .json({ status: false, message: "URL Facebook diperlukan" });
  }

  try {
    const response = await axios.get(
      `https://aiovideodownloader.com/api/facebook?url=${url}`
    );
    const result = response.data;

    if (!result.sd && !result.hd) {
      console.log("No Facebook Post download links found"); // Debug: Log no links found
      return res
        .status(404)
        .json({
          status: false,
          message: "Gagal menemukan tautan unduhan Facebook Post",
        });
    }

    console.log("Facebook Post Download Links:", {
      sdUrl: result.sd,
      hdUrl: result.hd,
    }); // Debug: Log download links

    return res.status(200).json({
      status: true,
      message: "Tautan unduhan Facebook Post ditemukan",
      data: {
        sdUrl: result.sd,
        hdUrl: result.hd,
        thumbnail: result.thumbnail,
        title: result.title,
      },
    });
  } catch (error) {
    console.error("Error downloading Facebook Post:", error);
    return res
      .status(500)
      .json({
        status: false,
        message: "Gagal mengunduh Facebook Post",
        error: error.message,
      });
  }
};
