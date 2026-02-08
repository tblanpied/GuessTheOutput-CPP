#include <iostream>

void ping()
{
    std::cout << "X";
}

int get()
{
    ping();
    return 4;
}

int main()
{
    get();
    std::cout << get() << '\n';
}
