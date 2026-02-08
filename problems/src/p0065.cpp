#include <iostream>

int main()
{
    int x{ 1 };

    (x + 5);

    x = x + 5;
    std::cout << x << '\n';

    return 0;
}
