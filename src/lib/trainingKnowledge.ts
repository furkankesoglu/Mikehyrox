export type TrainingKnowledgeItem = {
  name: string;
  category: string;
  purpose: string;
  prescription: string;
  placement: string;
  safety: string;
  evidence: string;
};

export const trainingKnowledge: TrainingKnowledgeItem[] = [
  {
    name: "Power Clean",
    category: "OLİMPİK GÜÇ",
    purpose: "Yüksek güç üretimi, triple extension, erken kuvvet üretim hızı (RFD) ve sprint ivmelenmesine aktarım.",
    prescription: "Teknik yeterliyse 3-5 set x 2-3 tekrar; çoğunlukla yaklaşık %60-80 1RM; tekrarlar hızlı ve temiz kalmalı.",
    placement: "Haftada 1 ana güç teması. Ağır metabolik CrossFit gününden ve ağır eksantrik alt-vücut gününden mümkünse ayrı tutulur.",
    safety: "Failure yok. Bel nötr, bar vücuda yakın. Teknik bozulursa yük azalt veya clean pull / high pull türevine dön.",
    evidence: "Power clean çalışmalarında yüksek kuvvet/güç çıktıları yaklaşık %60-80 1RM aralığında görülmüş; olimpik kaldırış antrenmanları sprint performansı için destekleyici olabilir.",
  },
  {
    name: "Hang Power Clean / Mid-thigh Power Clean",
    category: "OLİMPİK GÜÇ",
    purpose: "İkinci çekiş, hızlı kalça-diz-ayak bileği ekstansiyonu ve patlayıcı güç. Tam clean'e göre teknik yükü azaltmak için kullanılabilir.",
    prescription: "3-4 x 2-3; hız kaybolmadan orta yük.",
    placement: "Power clean yerine varyasyon veya teknik gününde düşük hacim.",
    safety: "Bel geçmişinde yerden ağır çekiş hacmini azaltmak için hang/mid-thigh başlangıç tercih edilebilir.",
    evidence: "Mid-thigh power clean ve clean pull varyasyonları yüksek peak power ve vertical ground reaction force üretebilir.",
  },
  {
    name: "Clean Pull / High Pull / Jump Shrug",
    category: "OLİMPİK TÜREV",
    purpose: "Catch gerektirmeden yüksek hız, kuvvet ve RFD geliştirmek; yorgunluk veya teknik sınırlamada clean alternatifi.",
    prescription: "3-5 x 3; jump shrug daha hafif/hızlı, clean pull daha kuvvet odaklı.",
    placement: "Clean tekniği zayıfsa veya bel/omuz yorgunluğunda olimpik güç gününde alternatif.",
    safety: "Kontrollü başlangıç, agresif fakat teknik triple extension; belden hiper-ekstansiyon yok.",
    evidence: "Jump shrug ve high pull varyasyonları bazı yüklerde hang clean'den daha yüksek peak power/velocity üretebilir.",
  },
  {
    name: "Power Jerk",
    category: "OLİMPİK GÜÇ",
    purpose: "Alt vücut dip-drive gücünü üst gövdeye aktarma, overhead stabilite ve hızlı kuvvet aktarımı; burpee sonrası ayağa kalkış/pressing kapasitesine dolaylı destek.",
    prescription: "Teknik yeterliyse 3-5 x 2-3; RPE 6-7 civarı, hız ve pozisyon öncelikli.",
    placement: "Clean ile kompleks yapılabilir (1 clean + 1-2 jerk) fakat HYROX metabolik devresinden ayrı veya devrenin çok öncesinde düşük hacim.",
    safety: "Bel ekstansiyonuyla kilitleme yok; dip dik; ağrı/teknik bozulmasında push press alternatifi.",
    evidence: "Clean & jerk performansı RFD ve alt-vücut maksimum kuvvetiyle ilişkilidir; CrossFit clean-and-jerk performansı da whole-body strength ile ilişkilidir.",
  },
  {
    name: "Concentric-only Squat / Pin Squat",
    category: "KONSANTRİK KUVVET",
    purpose: "Stretch-shortening katkısını azaltıp duruştan kuvvet üretimini, starting strength ve propulsif impulse kapasitesini geliştirmek.",
    prescription: "Rack pinlerinden dead-stop başlangıç; 3-5 x 2-4. Ağır fakat hız korunmalı; RPE 7-8, failure yok.",
    placement: "Sprint güç gününde olimpik kaldırıştan sonra. Eksantrik squat ana gününden ayrı tutulur.",
    safety: "Çok ağır yük yalnız teknik ve bracing yeterliyse. Bel geçmişi nedeniyle yük artışı küçük adımlarla.",
    evidence: "Concentric squat/jump-squat power ve propulsif impulse sprint ivmelenmesiyle ilişkilidir; ancak tek başına akut potentiation kanıtı tutarlı değildir.",
  },
  {
    name: "Eccentric Tempo Squat",
    category: "EKSANTRİK KUVVET",
    purpose: "Eksantrik kontrol, kuvvet absorpsiyonu, tendon-kas kapasitesi ve pozisyon kalitesini geliştirmek; koşu ve burpee tekrarlarında frenleme-kontrol kapasitesini desteklemek.",
    prescription: "3-4 x 4-6; 2-4 sn kontrollü iniş + normal/hızlı kalkış. Ana amaç teknik/kuvvet ise gereksiz 6-10 sn aşırı yavaş tempo kullanılmaz.",
    placement: "Ayrı alt-vücut kuvvet gününde; maksimum sprint veya ağır olimpik gününden 48 saat civarı uzağa yerleştirmek tercih edilir.",
    safety: "Bel ağrısı artarsa ROM/yük azalt. Eccentric overload yöntemleri deneyim ve ekipman yoksa agresif kullanılmaz.",
    evidence: "Eccentric resistance training kuvvet, sprint ve yön değiştirme gibi performans niteliklerini destekleyebilir; çok yavaş eksantriklerin performans için üstünlüğü net değildir.",
  },
  {
    name: "Resisted Sprint / Sled Push Acceleration",
    category: "KOŞU GÜCÜ",
    purpose: "Yatay kuvvet, ivmelenme ve sprint force-velocity profilini geliştirmek; HYROX sled ile de yüksek özgüllük.",
    prescription: "Kısa 10-20 m tekrarlar; amaç hızı tamamen öldürmeden güçlü itiş. Kalite odaklı 4-8 tekrar.",
    placement: "Taze durumda, ağır metabolik devreden önce veya ayrı hız gününde.",
    safety: "Form bozulacak kadar yükleme yok; bel ağrısı ve hamstring semptomunda dur.",
    evidence: "Resisted sprint/sled çalışmaları erken ivmelenme, yatay kuvvet ve güç değişkenlerini geliştirebilir.",
  },
  {
    name: "Burpee Broad Jump Power Block",
    category: "HYROX BURPEE",
    purpose: "Yere iniş-kalkış verimliliği, hızlı kalça ekstansiyonu, horizontal projection ve tekrarlar arası ritim.",
    prescription: "Teknik blok: 4-6 x 4-6 burpee broad jump veya 10-15 m; tam dinlenme ile kalite. Metcon'a çevirmeden önce mekanik verimlilik.",
    placement: "Olimpik güç veya sprint gününün sonunda düşük hacim; büyük HYROX devresinde ayrıca yarış özgül hacim.",
    safety: "Bel çökmesi yok; yere kontrollü iniş; yorgunlukta adım-back varyasyonuna geçilebilir.",
    evidence: "Doğrudan burpee için sınırlı spesifik çalışma vardır; kullanım mantığı whole-body strength, RFD, horizontal power ve CrossFit/HYROX özgüllük prensiplerinden türetilmiştir.",
  },
];

export const programmingRules = [
  "Olimpik kaldırışlar kondisyona kurban edilmez: önce teknik/güç, sonra metabolik iş.",
  "Power Clean ve Power Jerk haftada genellikle 1 ana yüksek kaliteli güç temasında kullanılır; ekstra gün yalnız teknik/düşük hacimdir.",
  "Bir önceki gün ağır olimpik kaldırış + CrossFit yapıldıysa ertesi gün ağır clean/jerk veya ağır squat yazılmaz; Zone 2, üst vücut veya toparlanma tercih edilir.",
  "Concentric-only squat/pin squat sprint başlangıç kuvveti için; eccentric squat ise ayrı gün eksantrik kapasite ve kontrol için kullanılır.",
  "Ağır konsantrik squat ve yüksek hacimli eccentric squat aynı güne yığılmaz.",
  "Sprint geliştirmek için sadece squat yeterli değildir; serbest sprint ve/veya resisted sprint teması korunur.",
  "Burpee gelişimi sadece yüksek tekrar burpee ile değil; horizontal power, hızlı ayağa kalkış, trunk stiffness ve teknik ekonomi ile birlikte ele alınır.",
  "Bel ağrısı 3/10 üstüne çıkarsa olimpik kaldırış, squat ve sled yükü azaltılır; yayılan nörolojik semptomda seans kesilir.",
  "Failure yok; hız belirgin düşüyorsa güç seti bitirilir.",
];
