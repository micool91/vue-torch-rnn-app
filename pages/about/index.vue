<template>
<div class="card card-1">
  <h1>O projekcie</h1>
  <p>Serwis prezentuje wybrane możliwości wykorzystania modelu sieci neuronowych typu <i>Long Short-Term Memory</i> do generowania treści. Autorem pierwszej implementacji modelu jest <a href="http://karpathy.github.io/"> Andrej Karpathy</a>, serwis wykorzystuje natomiast implementację udoskonaloną przez <a href="https://cs.stanford.edu/people/jcjohns/">Justina Johnsona</a>. Model ten nosi nazwę Torch-RNN i jego kod źródłowy jest dostępny na platformie GitHub (<a href="https://github.com/jcjohnson/torch-rnn">o tutaj</a>).</p>
  <p>Aby móc wytrenować własny model należy poprawnie skonfigurować środowisko (<i>Python</i> oraz <i>LUA</i> z frameworkiem <i>Torch</i>). Opis instalacji zawarty jest w repozytorium projektu, szczegółowe informacje na temat konfiuguracji środowiska zostały opisane również w samej <a href="https://bitbucket.org/mjakobowski/magisterka/src/master/">pracy magisterskiej</a>.</p>
  <center>
  <img src="https://www.python.org/static/community_logos/python-logo-master-v3-TM.png" alt="Python">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lua-logo-nolabel.svg/2000px-Lua-logo-nolabel.svg.png" alt="LUA">
  <img src="https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/torch/torch-tw.png" alt="Torch">
  </center>
  <br><br><br>
  <h1>Treści</h1>
  <p>Treści wykorzystywane w modelach treningowych pochodzą z wolnych źródeł serwisów <a href="https://wolnelektury.pl">WolneLektury.pl</a> oraz <a href="https://pl.wikisource.org/">Wikiźródła</a>.</p>
  <center>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Wikisource-logo.svg/1200px-Wikisource-logo.svg.png" alt="Wikiźródła">
  <img src="http://czytelniczy.pl/wp-content/uploads/2017/08/wolnelektury-e1503660338308.png" alt="WolneLektury.pl">
  </center>
</div>
</template>


<style scoped>
h1 {
  text-align: center;
}

.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  margin: 1rem;
  position: relative;
  width: 98%;
  padding: 30px;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

a {
  text-decoration: none;
  color: #3b8070;
}
a:hover {
  color: #41b883;
  text-decoration: underline;
}

p {
  padding: 10px;
  font-size: 1.2em;
}

img {
    max-height: 200px;
    padding: 30px;
}
</style>
