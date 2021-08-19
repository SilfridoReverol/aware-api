const PDFDocument = require('pdfkit');
const fs = require('fs');
const moment = require('moment');

module.exports = (becksData, becksUser) => {
  var doc = new PDFDocument({
    autoFirstPage: false,
  });

  doc.pipe(
    fs.createWriteStream(
      `Beck's ${becksUser.first_name + becksUser.last_name}.pdf`
    )
  );

  // doc.image('../assets/nobg-awarelogo.png', 0, 15, { width: 300 });

  doc.addPage({
    size: 'A4',
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  });
  // doc.text(`${becksUser.first_name} ${becksUser.last_name}`, 100, 100);

  // doc.text(`${becksData.total_score}`);
  doc.image('src/assets/nobg-awarelogo.png', 100, 50, { fit: [100, 120] });

  doc.fontSize(14);
  doc.moveDown(2);
  doc.text('Inventario de Depresión de Beck', {
    underline: true,
    align: 'center',
  });

  doc.fontSize(12);
  doc.moveDown(1);
  doc.text(
    `Nombre: ${becksUser.first_name} ${
      becksUser.last_name
    }    Edad: ${moment().diff(becksUser.saved_age, 'years', false)}   Sexo: ${
      becksUser.saved_sex.charAt(0).toUpperCase() + becksUser.saved_sex.slice(1)
    }   Fecha: ${moment(becksData.test_date).format('DD-MM-YYYY')}`,
    {
      paragraphGap: 10,
      align: 'center',
      columns: 1,
    }
  );

  doc.moveDown(2);
  doc.text(
    `1. Tristeza 
        0. No me siento triste. 
        1. Me siento triste gran parte del tiempo. 
        2. Me siento triste todo el tiempo. 
        3. Me siento tan triste o soy tan infeliz que no puedo soportarlo.
        Selección: ${becksData.q1}`
  );

  doc.moveDown(2);
  doc.text(
    `2. Pesimismo 
        0. No estoy desalentado respecto del mi futuro. 
        1. Me siento más desalentado respecto de mi futuro que lo que solía estarlo. 
        2. No espero que las cosas funcionen para mi. 
        3. Siento que no hay esperanza para mi futuro y que sólo puede empeorar.
        Selección: ${becksData.q2}`
  );

  doc.moveDown(2);
  doc.text(
    `3. Fracaso 
        0. No me siento como un fracasado. 
        1. He fracasado más de lo que hubiera debido. 
        2. Cuando miro hacia atrás, veo muchos fracasos. 
        3. Siento que como persona soy un fracaso total.
        Selección: ${becksData.q3}`
  );

  doc.moveDown(2);
  doc.text(
    `4. Pérdida de Placer 
        0. Obtengo tanto placer como siempre por las cosas de las que disfruto. 
        1. No disfruto tanto de las cosas como solía hacerlo. 
        2. Obtengo muy poco placer de las cosas que solía disfrutar. 
        3. No puedo obtener ningún placer de las cosas de las que solía disfrutar.  
        Selección: ${becksData.q4}`
  );

  doc.moveDown(2);
  doc.text(
    `5. Sentimientos de Culpa 
        0. No me siento particularmente culpable. 
        1. Me siento culpable respecto de varias cosas que he hecho o que debería haber hecho. 
        2. Me siento bastante culpable la mayor parte del tiempo. 
        3. Me siento culpable todo el tiempo. 
        Selección: ${becksData.q5}`
  );

  doc.addPage({
    size: 'A4',
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  });

  doc.text(
    `6. Sentimientos de Castigo 
        0. No siento que este siendo castigado. 
        1. Siento que tal vez pueda ser castigado. 
        2. Espero ser castigado. 
        3. Siento que estoy siendo castigado.
        Selección: ${becksData.q6}`
  );

  doc.moveDown(2);
  doc.text(
    `7. Disconformidad con uno mismo. 
        0. Siento acerca de mi lo mismo que siempre. 
        1. He perdido la confianza en mí mismo. 
        2. Estoy decepcionado conmigo mismo. 
        3. No me gusto a mí mismo. 
        Selección: ${becksData.q7}`
  );

  doc.moveDown(2);
  doc.text(
    `8. Autocrítica 
        0. No me critico ni me culpo más de lo habitual. 
        1. Estoy más crítico conmigo mismo de lo que solía estarlo. 
        2. Me critico a mí mismo por todos mis errores. 
        3. Me culpo a mí mismo por todo lo malo que sucede.
        Selección: ${becksData.q8}`
  );

  doc.moveDown(2);
  doc.text(
    `9. Pensamientos o Deseos Suicidas 
        0. No tengo ningún pensamiento de matarme. 
        1. He tenido pensamientos de matarme, pero no lo haría.
        2. Querría matarme. 
        3. Me mataría si tuviera la oportunidad de hacerlo.
        Selección: ${becksData.q9}`
  );

  doc.moveDown(2);
  doc.text(
    `10. Llanto 
        0. No lloro más de lo que solía hacerlo. 
        1. Lloro más de lo que solía hacerlo. 
        2. Lloro por cualquier pequeñez. 
        3. Siento ganas de llorar pero no puedo. 
        Selección: ${becksData.q10}`
  );

  doc.moveDown(2);
  doc.text(
    `11. Agitación 
        0. No estoy más inquieto o tenso que lo habitual. 
        1. Me siento más inquieto o tenso que lo habitual. 
        2. Estoy tan inquieto o agitado que me es difícil quedarme quieto. 
        3. Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o 
        haciendo algo.
        Selección: ${becksData.q11}`
  );

  doc.moveDown(2);
  doc.text(
    `12. Pérdida de Interés 
        0. No he perdido el interés en otras actividades o personas. 
        1. Estoy menos interesado que antes en otras personas o cosas. 
        2. He perdido casi todo el interés en otras personas o cosas.`
  );

  doc.fontSize(12);
  doc.addPage({
    size: 'A4',
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  });

  doc.text(
    `
      3. Me es difícil interesarme por algo. 
      Selección: ${becksData.q12}`
  );

  doc.moveDown(2);
  doc.text(
    `13. Indecisión 
        0. Tomo mis propias decisiones tan bien como siempre. 
        1. Me resulta más difícil que de costumbre tomar decisiones. 
        2. Encuentro mucha más dificultad que antes para tomar decisiones. 
        3. Tengo problemas para tomar cualquier decisión. 
        Selección: ${becksData.q13}`
  );

  doc.moveDown(2);
  doc.text(
    `14. Desvalorización 
        0. No siento que yo no sea valioso. 
        1. No me considero a mi mismo tan valioso y útil como solía considerarme. 
        2. Me siento menos valioso cuando me comparo con otros. 
        3. Siento que no valgo nada. 
        Selección: ${becksData.q14}`
  );

  doc.moveDown(2);
  doc.text(
    `15. Pérdida de Energía 
        0. Tengo tanta energía como siempre. 
        1. Tengo menos energía que la que solía tener. 
        2. No tengo suficiente energía para hacer demasiado. 
        3. No tengo energía suficiente para hacer nada. 
        Selección: ${becksData.q15}`
  );

  doc.moveDown(2);
  doc.text(
    `16. Cambios en los Hábitos de Sueño  
        0. Puedo dormir tan bien como de costumbre. 
        1. No duermo tan bien como solía hacerlo. 
        2. Me despierto una o dos horas antes de lo habitual y me cuesta volver a dormirme.  
        3. Me despierto varias horas antes de lo que solía hacerlo y no puedo volver a dormir. 
        Selección: ${becksData.q16}`
  );

  doc.moveDown(2);
  doc.text(
    `17. Irritabilidad 
        0. No estoy tan irritable que lo habitual. 
        1. Estoy más irritable que lo habitual. 
        2. Estoy mucho más irritable que lo habitual. 
        3. Estoy irritable todo el tiempo.  
        Selección: ${becksData.q17}`
  );

  doc.moveDown(2);
  doc.text(
    `18. Cambios en el Apetito 
        0. No he experimentado ningún cambio en mi apetito. 
        1. Mi apetito es un poco menor o mayor que lo habitual. 
        2. Mi apetito es mucho menor o mayor que antes.
        3. No tengo apetito en absoluto o quiero comer todo el día.  
        Selección: ${becksData.q18}`
  );

  doc.fontSize(12);
  doc.addPage({
    size: 'A4',
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  });

  doc.text(
    `19. Dificultad de Concentración 
        0. Puedo concentrarme tan bien como siempre. 
        1. No puedo concentrarme tan bien como habitualmente 
        2. Me es difícil mantener la mente en algo por mucho tiempo. 
        3. Encuentro que no puedo concentrarme en nada. 
        Selección: ${becksData.q19}`
  );

  doc.moveDown(2);
  doc.text(
    `20. Cansancio o Fatiga 
        0. No estoy más cansado o fatigado que lo habitual. 
        1. Me fatigo o me canso más fácilmente que lo habitual. 
        2. Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer.  
        3. Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer.   
        Selección: ${becksData.q20}`
  );

  doc.moveDown(2);
  doc.text(
    `21. Pérdida de Interés en el Sexo 
        0. No he notado ningún cambio reciente en mi interés por el sexo. 
        1. Estoy menos interesado en el sexo de lo que solía estarlo. 
        2. Estoy mucho menos interesado en el sexo. 
        3. He perdido completamente el interés en el sexo.   
        Selección: ${becksData.q21}`
  );

  doc.fontSize(14);
  doc.moveDown(4);
  doc.text(`Puntaje Total: ${becksData.total_score}`, {
    align: 'center',
  });

  doc.end();
};
