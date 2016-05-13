var articles = [];

function Article (opts) {
  // DONE: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.siteUrl = opts.siterUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;

}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();

  $newArticle.attr('data-category', this.category);
  // TODO: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.
  $newArticle.find('h1').html(this.title);
  $newArticle.find('address > a').text(this.author);
  $newArticle.find('address > a').attr('href', this.siteUrl);
  $newArticle.find('.article-body').html(this.body);

  // This is a separate inclusion of the publication date as a 'title' attribute
  // to show on hover:
  // $newArticle.find('time[pubdate]').attr('title', this.publishedOn);

  // Display the date as a relative number of "days ago":
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  // $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
// var n= parseInt((new Date()-new Date(this.publishedOn))/60/60/24/1000);
// console.log(this.daysAgo);
  $newArticle.append('<hr>');
  $newArticle.removeClass('template');
  // TODO: This cloned article is no longer a template, so we should remove that class...

  return $newArticle;
};
ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// Sort our data by date published, descending order

// Now iterate through our transformed collection and instantiate a new Article
//  instance.
ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

// Append each Article to the DOM. Look carefully:
//   This '.toHtml' method is one we created.
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
