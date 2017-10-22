# Ось сложения
Обучение сложению однозначных чисел при помощи числовой оси

## Логика
Складываются 2 числа **a** и **b**, причем **a** &#8712; [6, 9], **a + b** &#8712; [11, 14].

*Прим. при **a** = 7 и **b** = 4, задача будет иметь вид 7 + 4 = 11.*

От пользователя требуется правильно заполнить инпуты и решить пример.

## Сценарий
1. Пояляется стрелка от **0** до **a**
    - Если число вводится неверно, число в инпуте краснеет, числа **а** подсвечивается желтым
    - Если число введено правильно => инпут превращается в число
2. Появляется стрелка от **a** до **a+b** аналогично пункту 1.
3. Вопрос в верхнем регистре заменяется на инпут
    - Если число вводится неверно, число в инпуте краснеет
    - Если число введено правильно, инпут превращается в число

## Скрины
1). Начальное состояние:
![](https://github.com/fargelus/Additive-Axis/blob/master/docs/initAxis.png)

2). Ошибка ввода первого слагаемого:
![](https://github.com/fargelus/Additive-Axis/blob/master/docs/firstWrong.png)

3). Ввод второго слагаемого:
![](https://github.com/fargelus/Additive-Axis/blob/master/docs/secondGuess.png)

4). Опять ошибка:
![](https://github.com/fargelus/Additive-Axis/blob/master/docs/secondWrong.png)

5). Ввод результата:
![](https://github.com/fargelus/Additive-Axis/blob/master/docs/resGuess.png)

6). Конечный результат примера:
![](https://github.com/fargelus/Additive-Axis/blob/master/docs/finished.png)
