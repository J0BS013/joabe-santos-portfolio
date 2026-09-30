---
locale: es
slug: thin-file-credit-decision-engine
order: 1
title: Thin-File Credit Decision Engine
eyebrow: Decision Science
description: Un caso sintético de política de crédito que conecta features point-in-time, riesgo calibrado, aceptación y valor esperado.
role: Decision scientist y responsable de la implementación
year: 2026
dataKind: synthetic
dataLabel: Solicitantes sintéticos
question: ¿A quién aprobar, qué primer límite ofrecer y cuándo una verificación adicional compensa la fricción?
repoUrl: https://github.com/J0BS013/thin-file-credit-decision-engine
demoUrl: https://thin-file-credit-decision.streamlit.app/
image: /images/projects/thin-file-credit-decision-engine.png
socialImage: /social/thin-file-credit-decision-engine.png
imageAlt: Simulador de decisión crediticia con recomendación, estimaciones de riesgo e inputs disponibles al decidir.
sourceCommit: 96806600894d401e71f0d572d6863ac7bcf29535
evidence:
  - label: Diseño de validación
    value: Out-of-time
  - label: Objetivo de política
    value: Valor esperado
  - label: Decisiones
    value: Aprobar · verificar · rechazar
limitations:
  - Cartera sintética; no representa desempeño crediticio real.
---

## La decisión

Una probabilidad no es una decisión de crédito. La pregunta operativa es a quién aprobar, cuánto ofrecer en el primer préstamo y si pedir más evidencia compensa la pérdida de conversión. Las elecciones interactúan: un umbral conservador reduce defaults, pero puede excluir clientes rentables; un límite alto puede convertir a un solicitante aceptable en una decisión de valor negativo.

Construí el proyecto para hacer visible esa capa de política. El resultado no es solamente “riesgo = 12%”, sino una recomendación de aprobar, verificar o rechazar, un monto, el valor esperado y una razón inspeccionable. Toda la cartera es sintética: el caso demuestra metodología y disciplina de ingeniería, no performance real de underwriting.

## Contexto

Los solicitantes thin-file tienen poco historial tradicional. La ausencia de bureau puede describir a una persona joven y viable, no automáticamente a un mal pagador. Al mismo tiempo, menos información aumenta la incertidumbre y la exposición a fraude o default. Convertir cada missing en cero introduciría una regla silenciosa de rechazo; ignorarlo subestimaría el riesgo.

La demanda también importa. Una oferta de bajo riesgo no crea valor si el cliente probablemente no la acepta. Por eso el motor estima default, fraude y take-up por separado y combina esas probabilidades con ingresos, pérdida y costo de verificación.

## Mi rol

Diseñé el proceso generador, la capa de features point-in-time, la validación temporal, los tres modelos y la política. También construí la interfaz Streamlit para revisar cada solicitud, los inputs disponibles en ese momento y la razón de la acción elegida.

El repositorio incluye comandos reproducibles, pruebas automatizadas, artefactos de modelos y política y documentación de los supuestos sintéticos. El foco fue el camino desde evidencia incompleta hasta una recomendación auditable.

## Restricciones

Las variables observadas después de la solicitud no pueden filtrarse al entrenamiento o scoring. La evaluación debe ser posterior al entrenamiento. La falta de bureau tiene que ser explícita y la política debe poder revisarse sin ingeniería inversa de los modelos.

El proyecto no demuestra fairness para grupos protegidos, identidad en producción ni cumplimiento normativo. Son requisitos materiales de un sistema real y se presentan como limitaciones.

## Enfoque

El pipeline genera solicitudes, bureau, señales de flujo de caja, documentos y resultados sintéticos. Las features usan únicamente información disponible al timestamp de decisión. Los modelos estiman default, fraude y take-up; la calibración se evalúa porque el valor depende de probabilidades confiables, no solamente del ranking.

Para cada monto candidato, la política combina aceptación, ingresos, pérdida crediticia, fraude y costo de verificación. Después elige la mejor acción de valor positivo bajo límites de riesgo. Una política challenger puede compararse con la champion sobre la misma población out-of-time.

> El modelo describe incertidumbre. La política convierte esa incertidumbre en una acción bajo restricciones económicas y de riesgo.

## Decisiones de diseño

Mantuve fraude y default separados porque permiten intervenciones distintas. La verificación puede reducir fraude sin cambiar el riesgo de pago. Take-up también permanece separado porque describe respuesta, no pérdida.

Elegí validación temporal y no un split aleatorio. El split puede repartir condiciones casi idénticas y exagerar la capacidad de avanzar en el tiempo. El tamaño inicial también se optimiza dentro de la política: una oferta menor puede seguir siendo rentable cuando el monto solicitado no lo es.

## Evidencia

La aplicación produce métricas reproducibles, diagnósticos de calibración, resúmenes de política y comparación champion/challenger. El simulador muestra default, fraude, take-up, valor esperado, monto recomendado, verificación y reason code.

Las pruebas cubren restricciones temporales, features, invariantes de política y reproducibilidad. El aviso de datos sintéticos evita que una economía simulada se confunda con impacto observado.

## Por qué un buen score no era suficiente

Una primera formulación trataba el score de default como el producto: elegir un corte y aprobar todo por debajo. Descarté ese camino porque ignoraba take-up, monto y verificación. También podía aprobar casos de valor negativo simplemente por estar bajo un umbral arbitrario.

La corrección fue optimizar acciones, no etiquetas. Cada acción tiene su economía y restricciones. “Verificar” solo aparece cuando el beneficio esperado de información justifica la fricción. Un rechazo puede deberse a valor no positivo sin un score extremo.

## Limitaciones

Todos los solicitantes y outcomes son sintéticos. El proyecto no establece discriminación, rentabilidad o estabilidad reales. No incluye shocks macroeconómicos, adaptación adversarial, cobranzas ni una evaluación completa de fairness. Los parámetros económicos son inputs de escenario.

## Próximo paso

El siguiente paso sería una evaluación shadow con datos históricos consentidos y gobernados. Definiría monitoreo de aprobación, pérdida, fairness y take-up antes de cambiar una política, comparando champion y challenger en ventanas idénticas e incorporando drift y overrides al criterio de lanzamiento.

## Enlaces

El repositorio contiene pipeline, pruebas y metodología. La demo revisa una política sintética y no evalúa personas reales.
