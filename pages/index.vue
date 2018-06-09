<template>
  <section class="zasobnik">
    <div class="cardPadding cardPadding-1">
      <img src="logos.png">
      <h1 class="title">
        jakobowski.app
      </h1>
      <h2 class="subtitle">
        Generowanie treści przy pomocy sieci LSTM
      </h2>
      <div class="odnosniki">
        <a href="https://github.com/micool91/vue-torch-rnn-app" target="_blank" class="button--green">Źródła GitHub</a>
        <a href="https://bitbucket.org/mjakobowski/magisterka/src/master/" target="_blank" class="button--grey">Repozytorium pracy magisterskiej</a>
      </div>
      <br>
      <br>
      <br>
      <hr>
      <br>
      <br>
      <br>
      <div class="opis">
<p>Niniejszy serwis powstał jako część pracy magisterskiej poruszającej temat generowania treści przy pomocy sieci neuronowych typu LSTM (<i>Long Short-Term Memory</i>). Motywacją do jego stworzenia stał się cytat pozostawiony przez jednego z pionierów zagadnienia sztucznej inteligencji jakim był Alan Turing. W roku 1950 zaproponował on pomysł na powołanie do życia sztucznej inteligencji. Chodzi tu o propozycję tak zwanego „umysłu dziecka”, którą opisał następująco:</p>
<br>
<div class="cytatX">Może zamiast dążyć do wytworzenia programu udającego umysł dorosłego, spróbować raczej wyprodukować program udający umysł dziecka? Poddawszy go stosownej edukacji, uzyskalibyśmy umysł dorosłego.</div>
<br>
<p>Ten prosty w swych założeniach pomysł zdaje się przyświecać zagadnieniu generowania treści przy użyciu sieci LSTM. W zagadnieniu tym również mamy na początku do czynienia z surowym modelem, którego to następnie należy poddać procesowi treningowemu aby osiągnąć zamierzony efekt – <b>upodobnić styl wygenerowanej treści do tego wytwarzanego przez żywego twórcę</b>.</p>
<br>
<p>Problem generowania treści spotykany jest obecnie w wielu branżach: od technologicznych po rozrywkowe. Przykładowo w programowaniu trendem jest tworzenie zintegrowanego środowiska deweloperskiego, które „podpowiada” programiście składnię języka, zmienia formatowanie kodu, a nawet jest w stanie zaproponować lepsze rozwiązanie danego implementacyjnego zagadnienia.</p>
<br>
<p>Innym, póki co bardziej abstrakcyjnym przykładem zastosowania inteligentnych systemów generowania treści może być stworzenie aplikacji dla copywriterów, redaktorów oraz pisarzy, która w sposób responsywny pomoże im dostarczać nam treści w formie tekstów reklamowych, artykułów, czy też całych powieści. Innymi słowy mówiąc - pozwoli im pisać <b>wspólnie z „Maszyną”</b>.</p>
<br>
<p>To właśnie ten ostatni pomysł stał się głównym tematem serwisu. Oferuje on generowanie treści z wcześniej wytrenowanych modelów. Baza zawiera modele wytrenowane na zbiorach dzieł wybranych twórców. Jendak nic nie stoi na przeszkodzie aby użytkownik poszerzył zasoby o własne wytrenowane modele.</p>
<br>
<div class="odnosniki">
    <center><nuxt-link class="button--green" to="/about">Czytaj więcej o projekcie</nuxt-link></center>
</div>
</div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.zasobnik
{
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 42px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 30px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.odnosniki
{
  padding-top: 15px;
}

.cardPadding {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  margin: 1rem;
  position: relative;
  width: 98%;
  padding: 30px;
}

.cardPadding-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.opis {
    text-align: left;
      padding: 10px;
  font-size: 1.2em;
}

.cytatX {
    padding: 30px;
    font-size: 23px;
    font-style: italic;
    text-align: left;
    width: 75%;
    margin: 0 auto;
    color: black;
}
</style>
