export default async function handler(req, res) {

    const url = req.query.url;

    if (!url) {
        return res.status(400).json({
            status: false,
            message: "No URL provided"
        });
    }

    try {

        // -------------------------
        // TIKTOK
        // -------------------------
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

        // -------------------------
        // INSTAGRAM
        // -------------------------
        if (
            url.includes("instagram.com")
        ) {

            return res.status(200).json({
                status: false,
                platform: "Instagram",
                message: "Instagram API not connected yet"
            });

        }

        // -------------------------
        // FACEBOOK
        // -------------------------
        if (
            url.includes("facebook.com") ||
            url.includes("fb.watch")
        ) {

            return res.status(200).json({
                status: false,
                platform: "Facebook",
                message: "Facebook API not connected yet"
            });

        }

        // -------------------------
        // YOUTUBE
        // -------------------------
        if (
            url.includes("youtube.com") ||
            url.includes("youtu.be")
        ) {

            return res.status(200).json({
                status: false,
                platform: "YouTube",
                message: "YouTube downloader disabled"
            });

        }

        // -------------------------
        // UNSUPPORTED
        // -------------------------
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
