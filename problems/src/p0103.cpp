#include <iostream>

int subtract(int first, int second);

int main()
{
    std::cout << subtract(10, 4) << '\n';
    return 0;
}

int subtract(int b, int a)
{
    return b - a;
}
