export type FAQItem = {
    question: string;
    answer: string;
  };
  
  const faqData: FAQItem[] = [
    {
      question: "Termografik muayene nedir?",
      answer:
        "Termografik muayene, güneş panellerinin ve BOS bileşenlerinin yüzey sıcaklıklarını ölçerek, arızalı veya verimliliği düşük bölgeleri tespit eden bir yöntemdir. Bu yöntem, panellerdeki sıcak noktaları ve diğer anomalileri belirlemek için kullanılır.",
    },
    {
      question: "Termografik muayene neden önemlidir?",
      answer:
        "Termografik muayene, güneş panellerindeki sıcaklık anormalliklerini erken tespit ederek, potansiyel arızaların ve verimlilik kayıplarının önüne geçilmesini sağlar. Bu sayede, santralin performansı artırılır ve bakım maliyetleri düşürülür.",
    },
    {
      question: "Termografik muayene nasıl yapılır?",
      answer:
        "Termografik muayene, termal kameralarla donatılmış drone’lar kullanılarak gerçekleştirilir. Drone’lar, panellerin üzerinden uçarak termal görüntüler toplar ve bu görüntüler MapperX platformu üzerinden analiz edilir.",
    },
    {
      question: "Termal Drone kullanmanın avantajları nelerdir?",
      answer:
        "Termal drone kullanımı, geniş alanların hızlı ve etkin bir şekilde taranmasını sağlar. Drone’lar, erişilmesi zor bölgelerde bile ayrıntılı termal görüntüler elde ederek, kapsamlı bir inceleme yapılmasına olanak tanır.",
    },
    {
      question: "Termografik muayene sonuçları nasıl raporlanır?",
      answer:
        "MapperX platformu, termografik muayene sonuçlarını IEC 62446 standartlarına uygun olarak raporlar. Bu raporlar, arızalı panellerin ve sıcak noktaların ayrıntılı analizini içerir.",
    },
    {
      question: "Termografik muayene hangi sıklıkla yapılmalıdır?",
      answer:
        "Termografik muayene, santralin periyodik bakım programına bağlı olarak yılda en az iki kez yapılmalıdır. Ancak, daha sık yapılan muayeneler, potansiyel sorunların erken tespit edilmesine ve önlenmesine yardımcı olabilir.",
    },
    {
      question: "Termografik muayene ile hangi tür arızalar tespit edilebilir?",
      answer:
        "Termografik muayene ile hücre, çoklu hücre, diyot, çoklu diyot, modül, sıcak nokta, dizi (string), bitki gölgeleme, kirlilik, gölgeleme, bağlantı kutusu, kırık/çatlak tespit edilebilir. Bu tür arızalar, santralin verimliliğini olumsuz etkileyebilir.",
    },
    {
      question: "MapperX platformu termografik muayene verilerini nasıl analiz eder?",
      answer:
        "MapperX platformu, yapay zeka destekli algoritmalar kullanarak termal görüntüleri analiz eder ve sıcaklık anormalliklerini tespit eder. Bu analizler, arızaların ve verimlilik kayıplarının hızlı bir şekilde belirlenmesini sağlar.",
    },
    {
      question: "Termografik muayene ile enerji verimliliği nasıl artırılır?",
      answer:
        "Termografik muayene, arızalı panellerin ve verimliliği düşük bölgelerin erken tespit edilmesini sağlar. Bu sayede, gerekli onarımlar ve bakımlar zamanında yapılarak enerji üretiminde maksimum verimlilik sağlanır.",
    },
    {
      question: "Denetim ve muayene nedir?",
      answer:
        "Denetim ve muayene, güneş enerjisi santrallerinin güvenli ve verimli bir şekilde çalışmasını sağlamak amacıyla yapılan düzenli kontrol ve değerlendirme süreçleridir. Bu süreçler, panellerin, invertörlerin ve diğer bileşenlerin performansını ve durumunu değerlendirir.",
    },
    {
      question: "Denetim ve muayene neden önemlidir?",
      answer:
        "Denetim ve muayene, güneş enerjisi santrallerinin optimum performansta çalışmasını sağlamak, potansiyel arızaları önceden tespit etmek ve güvenli operasyonları sürdürmek için kritik öneme sahiptir.",
    },
    {
      question: "Denetim ve muayene süreçlerinde hangi testler yapılır?",
      answer:
        "Denetim ve muayene süreçlerinde yapılan testler arasında I-V Curve testi, direnç testi, polarite testi, izolasyon testi gibi çeşitli testler ve ölçümler bulunur.",
    },
    {
      question: "MapperX platformu denetim ve muayene süreçlerinde nasıl yardımcı olur?",
      answer:
        "Denetim ve muayene süreçlerini dijitalleştirir, verileri tek bir platformda toplar ve analiz eder. Bu sayede manuel hataları azaltır, raporlama süreçlerini hızlandırır ve verimliliği artırır.",
    },
    {
      question: "Denetim ve muayene verileri nasıl toplanır ve analiz edilir?",
      answer:
        "Denetim ve muayene verileri görsel denetim, termal ölçümler ve çeşitli elektriksel test cihazları kullanılarak toplanır. MapperX platformu, bu verileri analiz eder, dijital ikizler oluşturur ve otonom raporlar sunar.",
    },
    {
      question: "Denetim ve muayene süreçlerinde hangi ekipmanlar kullanılır?",
      answer:
        "Denetim ve muayene süreçlerinde termal kameralar, drone’lar, multimetreler, izolasyon test cihazları ve I-V Curve test cihazları gibi çeşitli ekipmanlar kullanılır.",
    },
    {
      question: "MapperX platformu ile yapılan denetim ve muayeneler hangi standartlara uygundur?",
      answer:
        "MapperX platformu ile yapılan denetim ve muayeneler, IEC 62446 standartlarına uyumludur. Bu standartlar, güneş enerjisi santrallerinde denetim ve muayene süreçlerinin kalitesini ve güvenilirliğini sağlar.",
    },
    {
      question: "Denetim ve muayene süreçlerinde zaman ve maliyet tasarrufu nasıl sağlanır?",
      answer:
        "MapperX platformu, denetim ve muayene süreçlerini otonom hale getirerek manuel iş yükünü azaltır. Bu sayede, süreçler hızlanır, hatalar azalır ve önemli ölçüde zaman ve maliyet tasarrufu sağlanır.",
    },
    {
      question: "Denetim ve Muayene Verilerimi Raporlayabilir miyim?",
      answer:
        "Evet MapperX platformunu kullanarak gözlemlerinizi, termal ölçümlerinizi ve elektriksel ölçümlerinizi platforma kaydedebilir ve işlerinizi tek bir raporda toplayabilirsiniz.",
    },
    {
      question: "Elektriksel Test ve Ölçümleri MapperX ile Raporlayabilir miyim?",
      answer:
        "Evet santralde yapılan test ve ölçümlerin sonuçlarını platform üzerinde kaydederek iş akışlarınızı hızlandırabilir ve raporlayabilirsiniz. Bu size tüm sonuçları karşılaştırma ve analiz etme imkanı sağlar.",
    },
    {
      question: "Denetim ve muayene süreçlerinde seri numarası yönetimi neden önemlidir?",
      answer:
        "Seri numarası yönetimi, garanti talepleri, bakım ve değişim süreçlerinde kritik öneme sahiptir. MapperX platformu, seri numaralarını hızlıca tarayarak dijital ikizlerini oluşturur ve tüm verileri tek bir platformda yönetir.",
    },
    {
      question: "Denetim ve muayene raporları nasıl oluşturulur?",
      answer:
        "MapperX platformu, toplanan verileri analiz ederek IEC standartlarına uygun, detaylı ve güvenilir denetim ve muayene raporları oluşturur. Bu raporlar, santral performansını ve güvenliğini artırmak için kullanılır.",
    },
    {
      question: "Santral yönetimi nedir?",
      answer:
        "Santral yönetimi, güneş enerjisi santrallerinin verimli ve güvenli bir şekilde çalışmasını sağlamak için yapılan tüm operasyonel ve bakım faaliyetlerini kapsar.",
    },
    {
      question: "Seri numarası yönetimi nedir ve neden önemlidir?",
      answer:
        "Seri numarası yönetimi, güneş panelleri ve invertör gibi bileşenlerin seri numaralarının kayıt altına alınmasını ve izlenmesini sağlar. Bu, garanti talepleri, bakım ve değişim süreçlerinde büyük önem taşır. MapperX platformu, seri numaralarını hızlıca tarayarak dijital ikizlerini oluşturur ve tüm verileri tek bir platformda yönetir.",
    },
    {
      question: "Santral yönetimi ile finansal kayıplar nasıl önlenir?",
      answer:
        "Santral yönetimi, düzenli bakım ve izleme faaliyetleri ile potansiyel arızaların ve verimlilik kayıplarının önüne geçer. Bu sayede, enerji üretiminde süreklilik sağlanır ve finansal kayıplar minimize edilir.",
    },
    {
      question: "Meteorolojik veriler santral yönetiminde nasıl kullanılır?",
      answer:
        "Meteorolojik veriler, enerji üretim verimliliğinin hesaplanmasında ve bakım planlamasında kullanılır. MapperX platformu, bu verileri otomatik olarak çekerek analiz eder ve raporlar oluşturur.",
    },
    {
      question: "Santral yönetiminde ekip performansı nasıl takip edilir?",
      answer:
        "MapperX platformu, ekip üyelerinin görev dağılımlarını ve performanslarını izleme imkanı sunar. İş emirlerinin durumu ve ekiplerin performansı platform üzerinden takip edilerek optimize edilebilir.",
    },
    {
      question: "Santral verimliliğini artırmak için neler yapılabilir?",
      answer:
        "Santral verimliliğini artırmak için düzenli bakım ve onarımlar yapılmalı, termografik muayene ve elektriksel testler ile ekipman performansı izlenmeli ve gerektiğinde müdahaleler yapılmalıdır.",
    },
    {
      question: "MapperX platformu santral yönetiminde nasıl yardımcı olur?",
      answer:
        "Santral yönetimi süreçlerini dijitalleştirir, verimliliği artırır ve operasyonel yönetimi kolaylaştırır. Gerçek zamanlı operasyonel verileri izleme, otomatik raporlama ve analiz özellikleri ile santral yönetimini optimize eder.",
    },
    {
      question: "Santral yönetimi neden önemlidir?",
      answer:
        "Santral yönetimi, enerji üretim verimliliğini artırmak, maliyetleri düşürmek ve potansiyel arızaların önüne geçmek için kritik öneme sahiptir. İyi bir yönetim, santralin uzun ömürlü ve güvenli çalışmasını sağlar.",
    },
  ];
  
  export default faqData;