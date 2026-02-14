#include <iostream>

void f(int x)
{
    std::cout << x << '\n';
}

int main()
{
    f(static_cast<int>(5.9));
    return 0;
}
