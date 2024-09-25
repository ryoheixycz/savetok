const axios = require('axios');
exports.downloadTikTokVideo = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    try {
        // Mengirim request POST ke ssstik.io
        const response = await axios.post('https://ssstik.io/abc?url=dl', 
        new URLSearchParams({
            id: url,
            locale: 'en',
            tt: 'RHJHcms_',
        }).toString(),
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });

        const html = response.data;
        const nowmMatch = html.match(/<a href="(https:\/\/tikcdn\.io\/ssstik\/[^"]+)"[^>]*without_watermark[^>]*>/);
        const downloadTiktok_nowm = nowmMatch ? nowmMatch[1] : null;

        const mp3Match = html.match(/<a href="(https:\/\/tikcdn\.io\/ssstik\/[^"]+)"[^>]*music[^>]*>/);
        const downloadTiktok_mp3 = mp3Match ? mp3Match[1] : null;

        const imgMatch = html.match(/<img class="result_author" src="([^"]+)" alt="([^"]+)">/);
        const createrProfile_img = imgMatch ? imgMatch[1] : null;
        const creatorUsername = imgMatch ? imgMatch[2] : null;

        const descriptionMatch = html.match(/<p class="maintext">([^<]+)<\/p>/);
        const videoDescription = descriptionMatch ? descriptionMatch[1] : '';  // Jika tidak ada, kosongkan string

        if (!downloadTiktok_nowm && !downloadTiktok_mp3) {
            return res.status(404).json({ message: 'Failed to find download links' });
        }

        // Mengembalikan response ke client
        res.status(200).json({
            message: 'Download links found',
            downloadTiktok_nowm,
            downloadTiktok_mp3,
            createrProfile_img,
            creatorUsername,
            videoDescription
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to download video', error: error.message });
    }
};
