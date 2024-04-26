package org.supreme.utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.supreme.model.vo.CarDetailInfo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class ParseHtml {
    
    public static void parseHtmlForModelId(Integer modelId, CarDetailInfo carDetailInfo) {
        try {
            // 发送HTTP请求
            URL url = new URL("https://db.auto.sohu.com/model_" + modelId);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            // 读取响应数据
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // 解析HTML数据
            Document document = Jsoup.parse(response.toString());
            Element element = document.selectFirst("div.photo-area");
            if (element != null) {
                Elements ulElements = element.select("ul.photo-list");

                for (int i = 1; i < ulElements.size(); i++) {
                    Element ulElement = ulElements.get(i);
                    Elements imgTags = ulElement.select("img");

                    List<String> imgUrls = new ArrayList<>();
                    for (Element imgTag : imgTags)
                        imgUrls.add(imgTag.attr("src").replace("w_270", "w_400"));

                    // 根据索引将图片URL添加到对应的列表中
                    if (i == 1) {
                        carDetailInfo.setImgInside(imgUrls);
                    } else if (i == 2) {
                        carDetailInfo.setImgBottom(imgUrls);
                    }
                }
            }

            element = document.selectFirst("div.fi02_1");
            if (element == null)
                return;
            List<String> imgUrls = new ArrayList<>();
            for (Element img : element.select("img"))
                imgUrls.add(img.attr("src").replace("w_400,h_270", "w_800"));

            carDetailInfo.setImgStart(imgUrls);

            // 关闭连接
            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
