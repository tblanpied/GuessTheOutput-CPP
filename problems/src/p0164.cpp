#include <iostream>

int f(int x)
{
    if (x < 0)
        return 10;

    return 20;
}

int main()
{
    std::cout << f(-1) << '\n';
    std::cout << f(0) << '\n';
    return 0;
}
