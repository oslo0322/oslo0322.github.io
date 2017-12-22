var idx = lunr(function () {
  this.field('title', {boost: 10})
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')
});



  
  
    idx.add({
      title: "MySQL Indexing 的差別",
      excerpt: "我們都知道 MySQL 的 index 很重要，會影響 query 的速度，設定 index 的時候，通常直覺會直接對 columns(fields) 直接下index。 這樣的做法在一般情形下當然是ok，速度也都還可以接受，但是當資料成長到千萬筆以上的時候，就開始出現問題了，MySQL 在index 的選擇並不會很聰明地將 index 合併在一起。 舉個例子 我有username 和 timestamp...",
      categories: [],
      tags: [],
      id: 0
    });
    
  
    idx.add({
      title: "如何使用 Machine-Learning 去處理一些非規則性的資料",
      excerpt: "在 iCHEF，我們會利用政府公開的資料做一些處理並加以利用，經濟部商業司(Ministry of Economic Affairs,R.O.C.) 以下簡稱 MOEA 就是其中一個我們會利用的資料。 MOEA 會在每個月10號釋出一些公司或者商業的登記資料，這些資料的格式是 PDF，內容則有點像是 EXCEL的樣式。 分析資料 工具 所謂工欲善其事，必先利其器，分析之前要先準備好工具 而處理的工具，我們使用的是 python，下面列出最主要的工具 PDFMiner 處理 PDF...",
      categories: [],
      tags: [],
      id: 1
    });
    
  
    idx.add({
      title: "Bash Script 的一些簡單範例",
      excerpt: "Bash Script 是 Unix 系統內最好也最實用的內建語言，常常有些意想不到的 function grep + awk Example : ls -al -rw-r--r-- 1 oslo staff 327 Jun 7...",
      categories: [],
      tags: [],
      id: 2
    });
    
  
    idx.add({
      title: "在 AWS Lambda python 執行帶有 C module 的 libs",
      excerpt: "AWS Lambda 是一個很好用(邪惡?!)的東西，很多東西都可以用 Lambda 串起來，來達成event trigger 的目的，然而有個小小的缺點就是，很難開發跟 debug (CloudWatch)，所有執行的程式碼都放在 Lambda (可能實作上用docker?!)上。 如果你是用 Mac OSX 系統開發的話，在一般情形下，只要照 AWS 官方文件上建議的方法，包成zip，就可以執行了，但要用含有 C module 的...",
      categories: [],
      tags: [],
      id: 3
    });
    
  
    idx.add({
      title: "AWS 的 ELB 與 Nginx 的愛恨糾葛",
      excerpt: "當AWS ELB 碰到 Nginx，剛開始總是那麼地美好，但時間久了，總是會有些不是盡善盡美的地方… ELB 我們先來談談 ELB 的 IP 機制，之所以 ELB 給你 DNS (註1) 是因為他每過數個小時之後會更換 IP，而且一個 DNS ，至少會有兩個以上的 IP，就是這樣才會使用好用的 DNS...",
      categories: [],
      tags: [],
      id: 4
    });
    
  
    idx.add({
      title: "數值分析名詞紀錄",
      excerpt: "Story 最近發現，之前有些 google 過的東西，但是要再拿出來用的時候，突然忘記當初的關鍵字是下什麼了，又很緊急的要用，所以這次決定要把它記下來 (畢竟母語不是英文，常常會想不到對應的單字或者關鍵字) Consecutive 在數據分析很常用到的名詞，是來判斷 data 的連續性。 原理是一個都是數字的 array，然後 duplicate 一份，原本的數值是 +1，兩個 array 再相減，大於 1 的就是不連續了。 這點在 Numpy...",
      categories: [],
      tags: [],
      id: 5
    });
    
  
    idx.add({
      title: "Zero downtime migrate mongodb to a larger disk space",
      excerpt: "好久沒寫筆記了，趁這假日的空擋，來寫寫這次遭遇的事件 起因 這次事件，其實是因為公司的 MongoDB 的硬碟空間減少速度比預想中來得快(就商業來說是件好事！) 但對工程師來說就是個挑戰，因為出差回來，硬碟只剩下4％(估計剩下10天的容量) 一開始想法是砍資料，因為我們會將舊的資料放在 relation database上(又是另一個故事了) 原以為這樣能釋放 disk space (如果會就不會有這篇了。) 沒想到 MongoDB storage 的方式是，將資料一筆一筆堆疊在一起，最後合併成一個檔案直到這個檔案大小變成 2G，就會再開下一個檔案 可想而知，這樣，砍資料並不會將空間釋放。 舉例來說：...",
      categories: [],
      tags: [],
      id: 6
    });
    
  
    idx.add({
      title: "介紹 AWS 雲端架構",
      excerpt: "在開始介紹之前，先來談談一般常見的公司架構吧 架構 首先，一個中大型公司以上的公司，因為不同的專業，所以會有 部門 的存在，在部門之中。 在部門之中，通常也會分成 對外 以及 內部 舉個例子來說，對外就比較像是窗口，像是客服、業務…等，內部則是行政、工程…等單位。 其實在雲端的架構上來說，也跟公司的架構非常的類似，我們會有不同的 Subnet(部門) 來區分伺服器的類型。 伺服器類型其實有 Public Subnet(對外) 以及 Private Subnet(內部) 的區分...",
      categories: [],
      tags: [],
      id: 7
    });
    
  
    idx.add({
      title: "Using another decorator inherit the decorator in python.",
      excerpt: "最近碰到一個有趣的問題，導致想要做一個很奇怪的事情，想要在用一個 Decorator 去繼承另一個 Decorator，並加上一些東西。 起因 最近在寫的 Unit test 需要 Freeze time，例如我想要每次在 datetime.now() 的時候都是回傳一樣的時間。 之前用一個 lib 叫做 Freezegun 他可以利用 decorator 或...",
      categories: [],
      tags: [],
      id: 8
    });
    
  
    idx.add({
      title: "Interview Questions for Backend developer.",
      excerpt: "最近因為各種原因，短短幾個月內就一直在面試，就記錄一下最近碰到得面試題目吧。 Process vs Thread What’s the different between HTTP methods POST and GET? What is REST and RESTful? How CSRF...",
      categories: [],
      tags: [],
      id: 9
    });
    
  


console.log( jQuery.type(idx) );

var store = [
  
    
    
    
      
      {
        "title": "MySQL Indexing 的差別",
        "url": "http://localhost:4000/MySQL-indexing-Story/",
        "excerpt": "我們都知道 MySQL 的 index 很重要，會影響 query 的速度，設定 index 的時候，通常直覺會直接對 columns(fields) 直接下index。 這樣的做法在一般情形下當然是ok，速度也都還可以接受，但是當資料成長到千萬筆以上的時候，就開始出現問題了，MySQL 在index 的選擇並不會很聰明地將 index 合併在一起。 舉個例子 我有username 和 timestamp...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "如何使用 Machine-Learning 去處理一些非規則性的資料",
        "url": "http://localhost:4000/using-ML-parsing-MOEA-pdf/",
        "excerpt": "在 iCHEF，我們會利用政府公開的資料做一些處理並加以利用，經濟部商業司(Ministry of Economic Affairs,R.O.C.) 以下簡稱 MOEA 就是其中一個我們會利用的資料。 MOEA 會在每個月10號釋出一些公司或者商業的登記資料，這些資料的格式是 PDF，內容則有點像是 EXCEL的樣式。 分析資料 工具 所謂工欲善其事，必先利其器，分析之前要先準備好工具 而處理的工具，我們使用的是 python，下面列出最主要的工具 PDFMiner 處理 PDF...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Bash Script 的一些簡單範例",
        "url": "http://localhost:4000/bash-script-simple-example/",
        "excerpt": "Bash Script 是 Unix 系統內最好也最實用的內建語言，常常有些意想不到的 function grep + awk Example : ls -al -rw-r--r-- 1 oslo staff 327 Jun 7...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "在 AWS Lambda python 執行帶有 C module 的 libs",
        "url": "http://localhost:4000/aws-lambda-with-c-module/",
        "excerpt": "AWS Lambda 是一個很好用(邪惡?!)的東西，很多東西都可以用 Lambda 串起來，來達成event trigger 的目的，然而有個小小的缺點就是，很難開發跟 debug (CloudWatch)，所有執行的程式碼都放在 Lambda (可能實作上用docker?!)上。 如果你是用 Mac OSX 系統開發的話，在一般情形下，只要照 AWS 官方文件上建議的方法，包成zip，就可以執行了，但要用含有 C module 的...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "AWS 的 ELB 與 Nginx 的愛恨糾葛",
        "url": "http://localhost:4000/aws-elb-nginx/",
        "excerpt": "當AWS ELB 碰到 Nginx，剛開始總是那麼地美好，但時間久了，總是會有些不是盡善盡美的地方… ELB 我們先來談談 ELB 的 IP 機制，之所以 ELB 給你 DNS (註1) 是因為他每過數個小時之後會更換 IP，而且一個 DNS ，至少會有兩個以上的 IP，就是這樣才會使用好用的 DNS...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "數值分析名詞紀錄",
        "url": "http://localhost:4000/useful-command-or-function/",
        "excerpt": "Story 最近發現，之前有些 google 過的東西，但是要再拿出來用的時候，突然忘記當初的關鍵字是下什麼了，又很緊急的要用，所以這次決定要把它記下來 (畢竟母語不是英文，常常會想不到對應的單字或者關鍵字) Consecutive 在數據分析很常用到的名詞，是來判斷 data 的連續性。 原理是一個都是數字的 array，然後 duplicate 一份，原本的數值是 +1，兩個 array 再相減，大於 1 的就是不連續了。 這點在 Numpy...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Zero downtime migrate mongodb to a larger disk space",
        "url": "http://localhost:4000/mongodb-migrated-note/",
        "excerpt": "好久沒寫筆記了，趁這假日的空擋，來寫寫這次遭遇的事件 起因 這次事件，其實是因為公司的 MongoDB 的硬碟空間減少速度比預想中來得快(就商業來說是件好事！) 但對工程師來說就是個挑戰，因為出差回來，硬碟只剩下4％(估計剩下10天的容量) 一開始想法是砍資料，因為我們會將舊的資料放在 relation database上(又是另一個故事了) 原以為這樣能釋放 disk space (如果會就不會有這篇了。) 沒想到 MongoDB storage 的方式是，將資料一筆一筆堆疊在一起，最後合併成一個檔案直到這個檔案大小變成 2G，就會再開下一個檔案 可想而知，這樣，砍資料並不會將空間釋放。 舉例來說：...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "介紹 AWS 雲端架構",
        "url": "http://localhost:4000/vpc-introduce/",
        "excerpt": "在開始介紹之前，先來談談一般常見的公司架構吧 架構 首先，一個中大型公司以上的公司，因為不同的專業，所以會有 部門 的存在，在部門之中。 在部門之中，通常也會分成 對外 以及 內部 舉個例子來說，對外就比較像是窗口，像是客服、業務…等，內部則是行政、工程…等單位。 其實在雲端的架構上來說，也跟公司的架構非常的類似，我們會有不同的 Subnet(部門) 來區分伺服器的類型。 伺服器類型其實有 Public Subnet(對外) 以及 Private Subnet(內部) 的區分...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Using another decorator inherit the decorator in python.",
        "url": "http://localhost:4000/override-decorator/",
        "excerpt": "最近碰到一個有趣的問題，導致想要做一個很奇怪的事情，想要在用一個 Decorator 去繼承另一個 Decorator，並加上一些東西。 起因 最近在寫的 Unit test 需要 Freeze time，例如我想要每次在 datetime.now() 的時候都是回傳一樣的時間。 之前用一個 lib 叫做 Freezegun 他可以利用 decorator 或...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Interview Questions for Backend developer.",
        "url": "http://localhost:4000/interview-questions/",
        "excerpt": "最近因為各種原因，短短幾個月內就一直在面試，就記錄一下最近碰到得面試題目吧。 Process vs Thread What’s the different between HTTP methods POST and GET? What is REST and RESTful? How CSRF...",
        "teaser":
          
            null
          
      }
    
  ]

$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    var query = $(this).val();
    var result = idx.search(query);
    resultdiv.empty();
    resultdiv.prepend('<p class="results__found">'+result.length+' Result(s) found</p>');
    for (var item in result) {
      var ref = result[item].ref;
      if(store[ref].teaser){
        var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<div class="archive__item-teaser">'+
                '<img src="'+store[ref].teaser+'" alt="">'+
              '</div>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      else{
    	  var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  });
});
