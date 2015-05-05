package cn.edu.cqu.news.cotrollers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.cqu.news.domains.ImpNews;
import cn.edu.cqu.news.domains.News;
import cn.edu.cqu.news.domains.NewsCategory;

@RestController
public class NewsController {
	@RequestMapping(value="/findNewsCategories.do")
	public List<NewsCategory> findNewsCategories()
	{
		List<NewsCategory> categories=new ArrayList<NewsCategory>();
		categories.add(new NewsCategory("46","重大科研"));
		categories.add(new NewsCategory("47","重大学术" ));
		categories.add(new NewsCategory("48","重大教学"));
		categories.add(new NewsCategory("53","招生就业"));
		categories.add(new NewsCategory("54","重要新闻"));
		return categories;
	}
	@RequestMapping(value="/findNewsByCategory.do")
	public List<News> findNewsByCategory(String categoryId)
	{
		List<News> newsList=new ArrayList<News>();
		try {
			Document doc = Jsoup.connect("http://news.cqu.edu.cn/news/article/list.php?catid="+categoryId).get();
			Elements liphoto = doc.select("div.liphoto div.row1");
			for(Element row:liphoto)
			{
				Element link=row.select("a").first();
				Element img=row.select("img").first();
				News news=new News(link.attr("href"),img.attr("alt"),"","http://news.cqu.edu.cn/"+img.attr("src"));
				newsList.add(news);
			}
			//System.out.println(liphoto);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return newsList;
	}
	@RequestMapping(value="/findNews.do")
	public News findNews(String newsId)
	{
		News news=new News();
		try {
			Document doc = Jsoup.connect("http://news.cqu.edu.cn"+newsId).get();
			news.setTitle(doc.select("div.title h1").first().text());
			Element content=doc.select("#zoom").first();
			Elements imgs=doc.select("img");
			for(Element img:imgs)
			{
				String src=img.attr("src");
				img.attributes().remove("height");
				img.attributes().remove("alt");
				img.attr("width","100%");
				img.attr("src","http://news.cqu.edu.cn"+src );
			}
			content.attributes().remove("id");
			content.attributes().remove("class");
			news.setContent(content.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return news;
	}
	
	@RequestMapping("/findimpnews.do")
	public ImpNews findimpNews(String impnewsId){
		ImpNews impnews = new ImpNews();
		try {
			Document doc = Jsoup.connect("http://news.cqu.edu.cn"+impnewsId).get();
			impnews.setTitle(doc.select("div.title h1").first().text());
			Element content=doc.select("#zoom").first();
			Elements imgs=doc.select("img");
			for(Element img:imgs)
			{
				String src=img.attr("src");
				img.attributes().remove("height");
				img.attributes().remove("alt");
				img.attr("width","100%");
				img.attr("src","http://news.cqu.edu.cn"+src );
			}
			content.attributes().remove("id");
			content.attributes().remove("class");
			impnews.setContent(content.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return impnews;
	}
	
	@RequestMapping("/findlistimpnews.do")
	public List<ImpNews> findlistimpNews(){
		List<ImpNews> listImpNews = new ArrayList<ImpNews>();
		try {
			Document doc = Jsoup.connect("http://news.cqu.edu.cn/news").get();
			Elements tag_title = doc.select("div.topnews li.tag_title");
			for(Element el:tag_title){
				Element item = el.select("a").first();
				String title = item.attr("title");
				String id = item.attr("href");
				ImpNews impnews = new ImpNews(id,title,"");
				listImpNews.add(impnews);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return listImpNews;
	}
	
	public static void  main(String args[])
	{
		NewsController c=new NewsController();
		News news=c.findNews("/news/article/show.php?itemid=64700");
		System.out.println(news.getContent());
	}
}
