function fibo(base) {
  if (base <= 2)
    return 1;
  return fibo(base - 1) + fibo(base - 2);
}
