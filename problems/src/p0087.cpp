#include <iostream>

void bump(int x)
{
    x += 2;
    std::cout << x << '\n';
}

int main()
{
    int a{ 5 };
    bump(a);
    std::cout << a << '\n';
    return 0;
}
