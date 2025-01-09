export interface DataItem {
    DuyuruTarihi: string; 
    FirmaAdi: string;    
    FirmaIl: string;      
    FirmaIlce: string;   
    Marka: string;     
    PartiSeriNo: string; 
    UrunAdi: string;     
    UrunGrupAdi: string; 
    Uygunsuzluk: string;  
  }
  
  export interface ApiResponse {
    data: DataItem[];      
    draw: number;         
    recordsTotal: number;
    recordsFiltered: number;
  }

  export interface ApiResponse2 {
    title: string;
    content: string;
  }
  

  export interface Item {
    text: string;
    value: string;

    kaynak: string;
    kullanim_alani: string;
    kisa_tanim: string;
    zararlari: string[];

    selected?: boolean;
  }

  export interface Etiket {
    kod: string;
    isim: string;
    kaynak: string;
    kullanim_alani: string;
    kisa_tanim: string;
    zararlari: string[];
  }
  
  export interface FoodEtiketData {
    gida_renklendiricileri: Etiket[];
    gida_koruyuculari: Etiket[];
    antibiyotikler: Etiket[];
  }
  