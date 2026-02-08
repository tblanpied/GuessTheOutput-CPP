#include <iostream>

int process(int a);

int main()
{
    std::cout << process(5);
    return 0;
}

int process(int a, int b)
{
    return a + b;
}
