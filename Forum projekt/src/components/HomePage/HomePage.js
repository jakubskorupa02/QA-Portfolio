import React from "react";
import '../../post.css'

export function HomePage() {

    const readMore = () => {
        var dots = document.getElementById("dots");
        var moreText = document.getElementById("more");
        var btnText = document.getElementById("myBtn");
      
        if (dots.style.display === "none") {
          dots.style.display = "inline";
          btnText.innerHTML = "Czytaj dalej"; 
          moreText.style.display = "none";
        } else {
          dots.style.display = "none";
          btnText.innerHTML = "Czytaj mniej"; 
          moreText.style.display = "inline";
        }
    };
      

  return (
    <div>
      <div className="App">
        <div className="Content">
            <div className="post">
              <img
                src={require("../../assets/afc-lfc.webp")}
                alt="post"
              />
              <h1> Remis jak zwycięstwo: Liverpool 0-0 Arsenal</h1>
              <p>
                Kanonierzy zdołali wczoraj bezbramkowo zremisować na Anfield
                Road i tym samym podtrzymali nadzieje na awans do finału Carabao
                Cup. Sam mecz dla postronnego kibica mógł wydawać się nieco
                nudny, jednak fani Arsenalu powinni być zadowoleni z końcowego
                rezultatu, biorąc pod uwagę, że większą część meczu ich pupile
                grali w osłabieniu.
                <span id="dots">...</span>
                <span id="more">
                  Kluczowa dla przebiegu spotkania była 24. minuta, gdy Granit
                  Xhaka po raz kolejny w tym sezonie bezmyślnie faulował, w tym
                  przypadku wychodzącego na czystą pozycję Diogo Jotę, a arbiter
                  Michael Olivier bez wahania wyrzucił go za to zagranie z
                  boiska. Mimo optycznej przewagi gospodarzy, Arsenal próbował
                  wyprowadzać ataki i nie ograniczał się jedynie do bronienia
                  dostępu do własnej bramki. Choć w statystykach ujrzymy sporą
                  przewagę The Reds w posiadaniu piłki (77-23%), to obie drużyny
                  zdołały oddać zaledwie po jednym celnym strzale, co najlepiej
                  obrazuje przebieg spotkania. Fanom Arsenalu pozostaje mieć
                  nadzieję, że czwartkowy pojedynek nie odciśnie zbyt dużego
                  piętna na przygotowaniach zespołu do niedzielnych derbów z
                  Tottenhamem. Wiadomo już bowiem, że w środku pola nie będzie
                  mógł zagrać Xhaka, a Mikel Arteta świadom trudnej sytuacji
                  kadrowej, wezwał już ponoć z wypożyczenia Miguela Azeeza.
                  Wczorajszego wieczoru murawę kontuzjowany opuszczał także
                  Bukayo Saka, choć nie wiadomo jeszcze, czy ten uraz wykluczy
                  go z gry ze Spurs. Choć dla Kanonierów nie był to wymarzony
                  wieczór, to ten remis na Anfield należy przyjąć z pokorą,
                  patrząc na historię spotkań obu ekip w mieście Beatlesów.
                </span>
              </p>
              <button onClick={readMore} id="myBtn">
                Czytaj dalej
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
