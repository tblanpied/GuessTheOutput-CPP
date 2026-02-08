#include <iostream>

void tweak(int x)
{
    std::cout << "in:" << x << '\n';
    x = x + 10;
    std::cout << "out:" << x << '\n';
}

int main()
{
    int x{ 1 };

    tweak(x);
    tweak(x);

    std::cout << "main:" << x << '\n';
}
