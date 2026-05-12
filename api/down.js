export default async function handler(req, res) {

    const url = req.query.url;

    if (!url) {

        return res.status(400).json({
            status: false,
            message: "No URL provided"
        });

    }

    try {

        // =====================================================
        // TIKTOK
        // =====================================================
        if (
            url.includes("tiktok.com") ||
            url.includes("vt.tiktok.com")
        ) {

            const response = await fetch(
                `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`
            );

            const json = await response.json();

            if (json.data) {

                return res.status(200).json({
                    status: true,
                    platform: "TikTok",
                    data: {
                        title: json.data.title,
                        video: json.data.play,
                        music: json.data.music,
                        thumbnail: json.data.cover
                    }
                });

            }

        }

        // =====================================================
        // INSTAGRAM
        // =====================================================
        if (
            url.includes("instagram.com")
        ) {

            const response = await fetch(
                `https://api.vreden.my.id/api/igdl?url=${encodeURIComponent(url)}`
            );

            const json = await response.json();

            if (json.result && json.result.length > 0) {

                return res.status(200).json({
                    status: true,
                    platform: "Instagram",
                    data: {
                        title: "Instagram Video",
                        video: json.result[0].url
                    }
                });

            }

        }

        // =====================================================
        // FACEBOOK
        // =====================================================
        if (
            url.includes("facebook.com") ||
            url.includes("fb.watch")
        ) {

            const response = await fetch(
                `https://api.vreden.my.id/api/fbdl?url=${encodeURIComponent(url)}`
            );

            const json = await response.json();

            if (json.result) {

                return res.status(200).json({
                    status: true,
                    platform: "Facebook",
                    data: {
                        title: "Facebook Video",
                        video: json.result.hd || json.result.sd
                    }
                });

            }

        }

        // =====================================================
        // YOUTUBE
        // =====================================================
        if (
            url.includes("youtube.com") ||
            url.includes("youtu.be")
        ) {

            const response = await fetch(
                `https://api.vreden.my.id/api/ytdl?url=${encodeURIComponent(url)}`
            );

            const json = await response.json();

            if (json.result) {

                return res.status(200).json({
                    status: true,
                    platform: "YouTube",
                    data: {
                        title: json.result.title,
                        video: json.result.download?.url,
                        thumbnail: json.result.thumbnail
                    }
                });

            }

        }

        // =====================================================
        // UNSUPPORTED
        // =====================================================
        return res.status(400).json({
            status: false,
            message: "Unsupported platform"
        });

    } catch (e) {

        return res.status(500).json({
            status: false,
            message: "Server Error",
            error: e.toString()
        });

    }

                    }
