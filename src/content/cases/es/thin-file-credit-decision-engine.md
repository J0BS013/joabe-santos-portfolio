---
locale: es
slug: thin-file-credit-decision-engine
order: 1
title: Motor de Decisión Crediticia para Poco Historial
eyebrow: Decision Science
description: Un simulador interactivo de política crediticia que combina datos disponibles al decidir, riesgos calibrados, probabilidad de aceptación y valor esperado para recomendar aprobar, verificar o rechazar.
role: Política de crédito · modelos de riesgo · aplicación
year: 2026
dataKind: synthetic
dataLabel: Solicitantes sintéticos
question: ¿A quién aprobar, qué primer límite ofrecer y cuándo una verificación adicional compensa la fricción?
repoUrl: https://github.com/J0BS013/thin-file-credit-decision-engine
demoUrl: https://thin-file-credit-decision.streamlit.app/
image: /images/projects/thin-file-credit-decision-engine.png
socialImage: /social/thin-file-credit-decision-engine.png
imageAlt: Simulador de decisión crediticia con recomendación, estimaciones de riesgo y datos disponibles al decidir.
sourceCommit: 96806600894d401e71f0d572d6863ac7bcf29535
evidence:
  - label: Diseño de validación
    value: Out-of-time
  - label: Objetivo de política
    value: Valor esperado
  - label: Decisiones
    value: Aprobar · verificar · rechazar
scope:
  - Entorno sintético de decisión con supuestos económicos explícitos.
---

## Qué es este proyecto

El Motor de Decisión Crediticia para Poco Historial simula de forma reproducible el recorrido completo de una política de crédito para solicitantes con pocos antecedentes crediticios. Convierte los datos disponibles al decidir en estimaciones calibradas de impago, fraude y aceptación, y recomienda aprobar, verificar o rechazar junto con un monto inicial y su valor esperado.

Una probabilidad aislada no es una decisión de crédito. La pregunta operativa es a quién aprobar, cuánto ofrecer y si pedir más evidencia compensa la pérdida de conversión. Las elecciones interactúan: un umbral conservador reduce los impagos, pero puede excluir clientes rentables; un monto alto puede convertir a un solicitante aceptable en una decisión con valor negativo.

Construí el proyecto para hacer visible esa capa de política. El resultado no es solamente «riesgo = 12 %», sino una recomendación de aprobar, verificar o rechazar, un monto, el valor esperado y un motivo que puede revisarse. Toda la cartera es sintética: el caso demuestra metodología y disciplina de ingeniería, no resultados reales de concesión de crédito.

## Problema de negocio

Los solicitantes con poco historial tienen pocos antecedentes crediticios tradicionales. La ausencia de una puntuación de buró puede corresponder a una persona joven y viable, no necesariamente a un mal pagador. Al mismo tiempo, menos información aumenta la incertidumbre y la exposición al fraude o al impago. Convertir cada dato ausente en cero introduciría una regla silenciosa de rechazo; ignorarlo subestimaría el riesgo.

La demanda también importa. Una oferta de bajo riesgo no crea valor si el cliente probablemente no la acepta. Por eso el motor estima por separado el impago, el fraude y la probabilidad de aceptación, y combina esas probabilidades con ingresos, pérdidas y costos de verificación.

## Qué construí

Diseñé el proceso de generación, la capa de variables disponibles al decidir, la validación temporal, los tres modelos y la política. También construí la interfaz Streamlit para revisar cada solicitud, los datos disponibles en ese momento y el motivo de la acción elegida.

El repositorio incluye comandos reproducibles, pruebas automatizadas, artefactos de modelos y política y documentación de los supuestos sintéticos. El foco fue el camino desde evidencia incompleta hasta una recomendación auditable.

## Requisitos de diseño

Las variables observadas después de la solicitud no pueden filtrarse al entrenamiento ni a la puntuación de riesgo. La evaluación debe usar un periodo posterior al entrenamiento. La falta de información del buró debe ser explícita y la política tiene que poder revisarse sin aplicar ingeniería inversa a los modelos.

La evaluación de equidad entre grupos protegidos, la verificación de identidad en producción y el cumplimiento normativo quedan fuera de este entorno sintético y no están implícitos en la interfaz ni en los resultados.

## Cómo funciona el motor

El proceso genera solicitudes, datos de buró, señales de flujo de caja, documentos y resultados sintéticos. Las variables usan únicamente información disponible en el momento de la decisión. Los modelos estiman impago, fraude y probabilidad de aceptación; se evalúa la calibración porque el valor depende de probabilidades confiables, no solo de ordenar casos por riesgo.

Para cada monto posible, la política combina aceptación, ingresos, pérdida crediticia, fraude y costo de verificación. Después elige la mejor acción con valor positivo dentro de los límites de riesgo. Una política alternativa puede compararse con la vigente sobre la misma población de un periodo posterior al entrenamiento.

> El modelo describe incertidumbre. La política convierte esa incertidumbre en una acción bajo restricciones económicas y de riesgo.

## Decisiones clave

Mantuve el fraude y el impago separados porque permiten intervenciones distintas. La verificación puede reducir el fraude sin cambiar el riesgo de pago. La probabilidad de aceptación también permanece separada porque describe la respuesta del cliente, no una pérdida.

Elegí validación temporal en lugar de una división aleatoria. Una división aleatoria puede repartir condiciones casi idénticas y exagerar la capacidad de generalizar hacia el futuro. El monto inicial también se optimiza dentro de la política: una oferta menor puede seguir siendo rentable cuando el monto solicitado no lo es.

## Resultados y validación

La aplicación produce métricas reproducibles, diagnósticos de calibración, resúmenes de política y una comparación entre la política vigente y la alternativa. El simulador muestra impago, fraude, probabilidad de aceptación, valor esperado, monto recomendado, verificación y motivo de la decisión.

Las pruebas cubren restricciones temporales, variables, reglas de la política y reproducibilidad. El aviso de datos sintéticos evita confundir una economía simulada con un impacto observado.

## Por qué una buena puntuación de riesgo no era suficiente

Una primera formulación trataba la puntuación de impago como el producto: elegir un corte y aprobar todo lo que quedara por debajo. Descarté ese camino porque ignoraba la probabilidad de aceptación, el monto y la verificación. También podía aprobar casos con valor negativo simplemente por estar bajo un umbral arbitrario.

La corrección fue optimizar acciones, no etiquetas. Cada acción tiene su economía y sus restricciones. «Verificar» solo aparece cuando el beneficio esperado de obtener más información justifica la fricción. Un rechazo puede deberse a un valor no positivo sin que la puntuación de riesgo sea extrema.

## Cómo interpretar los resultados

Todos los solicitantes y resultados son sintéticos. El proyecto no demuestra discriminación, rentabilidad ni estabilidad reales. No incluye perturbaciones macroeconómicas, adaptación adversarial, cobranzas ni una evaluación completa de equidad. Los parámetros económicos son supuestos del escenario.

## Frontera de producción

Una implementación real exige evaluar la política en paralelo y sin afectar decisiones, usando datos históricos autorizados y gobernados. También requiere definir de antemano el monitoreo de aprobación, pérdidas, equidad y aceptación. La política vigente y la alternativa deben compararse en periodos idénticos, incluyendo cambios en los datos y excepciones manuales entre los criterios de lanzamiento.

## Explora el proyecto

El repositorio contiene el proceso, las pruebas y la metodología. La demostración permite revisar una política sintética y no evalúa a personas reales.
